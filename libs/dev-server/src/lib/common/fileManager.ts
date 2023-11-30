import * as fs from 'fs';
import * as path from 'path';

export class FileManager {
  constructor(private root: string) {}

  private getFullPath(relativePath: string) {
    return path.join(this.root, relativePath);
  }

  async createFile(relativePath: string, content: string) {
    await fs.promises.writeFile(this.getFullPath(relativePath), content);
  }

  async deleteFile(relativePath: string) {
    await fs.promises.unlink(this.getFullPath(relativePath));
  }

  async copyFile(source: string, destination: string) {
    await fs.promises.copyFile(
      this.getFullPath(source),
      this.getFullPath(destination)
    );
  }

  async moveFile(source: string, destination: string) {
    await fs.promises.rename(
      this.getFullPath(source),
      this.getFullPath(destination)
    );
  }

  async createFolder(relativePath: string) {
    await fs.promises.mkdir(this.getFullPath(relativePath), {
      recursive: true,
    });
  }

  async deleteFolder(relativePath: string) {
    await fs.promises.rmdir(this.getFullPath(relativePath), {
      recursive: true,
    });
  }

  async searchFile(fileName: string, relativePath?: string) {
    const files = await fs.promises.readdir(
      this.getFullPath(relativePath ?? this.root),
      {
        withFileTypes: true,
      }
    );
    return files.filter(
      (dirent) => dirent.isFile() && dirent.name.includes(fileName)
    );
  }
}
