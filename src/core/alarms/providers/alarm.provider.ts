import { Injectable } from '@nestjs/common';
import { exec } from "child_process";

@Injectable()
export class AlarmProvider {
    public emit(sound: number): void {
        switch(sound){
            case 1:
                exec("mplayer src/assets/1.mp3");
            case 2:
                exec("mplayer src/assets/2.mp3");
            default:
                exec("mplayer src/assets/1.mp3");
        }
    }
}
