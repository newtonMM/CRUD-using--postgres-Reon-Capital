"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planet_1 = require("./models/planet");
const sequelize_1 = __importDefault(require("./config/sequelize"));
const planet_2 = __importDefault(require("./routes/planet"));
const body_parser_1 = __importDefault(require("body-parser"));
console.log("Starting application");
const app = (0, express_1.default)();
(0, planet_1.initPlanetModel)(sequelize_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(planet_2.default);
const port = 3000;
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    server.close();
    yield sequelize_1.default.close();
});
process.once("SIGTERM", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Stopping application");
        yield shutdown();
        process.exit();
    });
});
