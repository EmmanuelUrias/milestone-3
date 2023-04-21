"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var auth_1 = __importDefault(require("./routes/auth"));
// Configurations
// const __filename = fileURLToPath(import.meta.url) <-- may delete later
// const __dirname = path.dirname(__filename)
// Middleware
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' })); // allows cross origin reqs but can't access res content
app.use((0, morgan_1.default)('common'));
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Routes 
app.use('/auth', auth_1.default);
app.listen(process.env.PORT, function () {
    console.log("Your running on ".concat(process.env.PORT, " \uD83D\uDE3C"));
});
