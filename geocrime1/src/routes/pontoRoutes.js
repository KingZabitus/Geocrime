const { Router } = require("express");
const { index, store, apagar } = require("../controllers/pontoController");

const router = Router();

router.get("/", index);

router.post("/", store);

router.delete("/:id", apagar);

module.exports = router