import { spawn } from 'child_process';
import { join } from 'path';
import { BrowserWindow } from 'electron';

export class PythonService {
  private pythonProcess: any;

  start() {
    const pythonPath = join(__dirname, '..', '..' , 'python', 'message_handler.py');
    this.pythonProcess = spawn('python', [pythonPath]);

    this.pythonProcess.stdout.on('data', (data: Buffer) => {
      try {
        const numbers = JSON.parse(data.toString());
        const mainWindow = BrowserWindow.getFocusedWindow();
        if (mainWindow) {
          mainWindow.webContents.send('number-update', numbers);
        }
      } catch (error) {
        console.error('Error parsing Python output:', error);
      }
    });

    this.pythonProcess.stderr.on('data', (data: Buffer) => {
      console.log('Python stderr:', data.toString());
    });
  }

  sendMessage(message: { msg: string }) {
    if (this.pythonProcess) {
      this.pythonProcess.stdin.write(JSON.stringify(message) + '\n');
    }
  }

  stop() {
    if (this.pythonProcess) {
      this.pythonProcess.kill();
    }
  }
}

export const pythonService = new PythonService();