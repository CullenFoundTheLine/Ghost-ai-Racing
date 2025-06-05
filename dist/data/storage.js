"use strict";
/// <reference types="node" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * StorageService handles saving and loading JSON data locally.
 * Writes to a “storage” folder inside /src/data/ at runtime.
 */
class StorageService {
    constructor() {
        // Use process.cwd() to get the absolute project root,
        // then point to 'src/data/storage'.
        this.basePath = path.resolve(process.cwd(), 'src', 'data', 'storage');
        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }
    }
    /**
     * Save any JSON‐serializable data under /src/data/storage/<filename>.json
     */
    saveData(filename, data) {
        const filePath = path.join(this.basePath, `${filename}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
    /**
     * Load JSON data from /src/data/storage/<filename>.json. Returns null if missing.
     */
    loadData(filename) {
        const filePath = path.join(this.basePath, `${filename}.json`);
        if (!fs.existsSync(filePath))
            return null;
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    }
    /**
     * Delete a stored JSON file if it exists.
     */
    deleteData(filename) {
        const filePath = path.join(this.basePath, `${filename}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
exports.StorageService = StorageService;
