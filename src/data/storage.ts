import * as fs from 'fs';
import * as path from 'path';

/**
 * StorageService handles saving and loading JSON data locally.
 * Writes to a “storage” folder inside /src/data/ at runtime.
 */
export class StorageService {
  private basePath: string;

  constructor() {
    // __dirname for this file is .../src/data
    this.basePath = path.resolve(__dirname, 'storage');
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }
  }

  /**
   * Save any JSON‐serializable data under /src/data/storage/<filename>.json
   */
  public saveData(filename: string, data: any): void {
    const filePath = path.join(this.basePath, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Load JSON data from /src/data/storage/<filename>.json. Returns null if missing.
   */
  public loadData<T>(filename: string): T | null {
    const filePath = path.join(this.basePath, `${filename}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  }

  /**
   * Delete a stored JSON file if it exists.
   */
  public deleteData(filename: string): void {
    const filePath = path.join(this.basePath, `${filename}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}