const express = require("express");
const router = new express.Router();

router.get("/spotify", async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome spotify" });
    } catch (error) {
        console.log(e);
        res.status(201).json({ message: "Internal server error" });
    }
})

module.exports = router