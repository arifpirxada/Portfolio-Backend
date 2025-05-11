const express = require("express");
const router = new express.Router();
const axios = require('axios');
const getAccessToken = require('./getAccessToken');
require('dotenv').config();

const getData = async (url) => {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
}

router.get("/spotify", async (req, res) => {
    try {
        const topTenTracks = await getData("https://api.spotify.com/v1/me/top/tracks?limit=10")
        const currentPlaying = await getData("https://api.spotify.com/v1/me/player/currently-playing")
        const following = await getData("https://api.spotify.com/v1/me/following?type=artist")

        const data = {
            top_ten_tracks: topTenTracks.data,
            current_playing: currentPlaying.data,
            following: following.data,
        }
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(201).json({ message: "Internal server error" });
    }
})


router.post('/spotify/play', async (req, res) => {
    const { trackUri } = req.body;
    if (!trackUri) {
        return res.status(400).json({ error: 'Track URI is required e.g., /spotify/play?trackUri=spotify:track:6habFhsOp2NvshLv26DqMb' });
    }

    try {
        const accessToken = await getAccessToken();
        await axios.put(
            'https://api.spotify.com/v1/me/player/play',
            { uris: [trackUri] },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.json({ message: `Started playing track: ${trackUri}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to play track', message: error });
    }
});

router.post('/spotify/pause', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        res.json({ message: 'Playback paused' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to pause playback' });
    }
});

module.exports = router