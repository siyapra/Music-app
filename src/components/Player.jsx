import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import music from './music.mp3';
import {
    AiFillCiCircle,
    AiFillPauseCircle,
    AiFillPlayCircle,
} from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import './Style.css';

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(music);
    const [time, setTime] = useState({
        min: '',
        sec: '',
    });
    const [currentTime, setCurrentTime] = useState({
        min: '',
        sec: '',
    });
    const [seconds, setSeconds] = useState();

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secsRemaining = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secsRemaining,
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrentTime({
                    min,
                    sec,
                });
            }
        }, 1000);
    }, [sound]);

    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    return (
        <div className='component'>
            <h2>🎵 Playing Now</h2>
            <img
                className='musicCover'
                src='https://picsum.photos/200/200'
                alt='music cover'
            />

            <div>
                <h3 className='title'>July</h3>
                <p className='subtitle'>John Patitucci</p>
            </div>

            <div>
                <button className='playButton'>
                    <IconContext.Provider value={{ size: '3rem', color: '#27AE60' }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className='playButton' onClick={playingButton}>
                        <IconContext.Provider
                            value={{ size: '3rem', color: '#27AE60' }}
                        >
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className='playButton' onClick={playingButton}>
                        <IconContext.Provider
                            value={{ size: '3rem', color: '#27AE60' }}
                        >
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}

                <button className='playButton'>
                    <IconContext.Provider value={{ size: '3rem', color: '#27AE60' }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>

            <div>
                <div className='time'>
                    <p>
                        {currentTime.min}:{currentTime.sec}
                    </p>

                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>

                <input
                    type='range'
                    min={0}
                    max={duration / 1000}
                    default='0'
                    value={seconds}
                    className='timeline'
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
        </div>
    );
};

export default Player;