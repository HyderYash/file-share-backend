const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.json({
        error: "Link has been expired or deleted from the server...",
      });
    }
    return res.json({
      uuid: file.uuid,
      fileName: file.fileName,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    return res.json({
      error: "Something went wrong...",
    });
  }
});

module.exports = router;
