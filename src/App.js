import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import pixelsun from './pixelsun.png';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [memeName, setMemeName] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'topText') {
      setTopText(value);
    } else if (name === 'bottomText') {
      setBottomText(value);
    } else if (name === 'memeName') {
      setMemeName(value);
    }
  }

  function generateMeme() {
    const url = `https://api.memegen.link/images/${encodeURIComponent(
      memeName,
    )}/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png`;
    setMemeUrl(url);
  }

  function downloadMeme() {
    if (memeUrl) {
      axios({
        url: memeUrl,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'meme.png');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading meme:', error);
        });
    }
  }

  useEffect(() => {
    downloadMeme();
  }, [memeUrl]);

  return (
    <div className={styles.App}>
      <div className={styles.topDiv}>
        <h1 className={styles['font-face-gm']}>MEME GENERATOR</h1>
      </div>
      <div className={styles['left-column']}>
        <div>
          <label className={styles.textInputs}>
            Top text
            <input
              className={styles.textInputs}
              name="topText"
              value={topText}
              onChange={handleInputChange}
              placeholder="deez"
            />
          </label>
        </div>
        <div>
          <label className={styles.textInputs}>
            Bottom text
            <input
              className={styles.textInputs}
              name="bottomText"
              value={bottomText}
              onChange={handleInputChange}
              placeholder="nuts"
            />
          </label>
        </div>
      </div>
      <div className={styles['middle-column']}>
        <h2>CHOOSE YOUR FIGHTER</h2>
        <div>
          <label className={styles.memeInputs}>
            Meme Name
            <input
              className={styles.textInputs}
              name="memeName"
              value={memeName}
              onChange={handleInputChange}
              placeholder="doge"
            />
          </label>
        </div>
        <div>
          <button
            onClick={generateMeme}
            id="startButton"
            className={styles.startButton}
          />
        </div>
      </div>
      <div className={styles['right-column']}>
        <div className={styles.grid}>
          <img src={pixelsun} className={styles.pixelSun} alt="pixel-sun" />
          {memeUrl ? (
            <img
              src={memeUrl}
              alt="Generated Meme"
              className={styles['meme-image']}
              data-test-id="meme-image"
            />
          ) : (
            <img
              src="https://api.memegen.link/images/kermit.jpg"
              className={styles.loadImage}
              data-test-id="meme-image"
              alt="kermit"
            />
          )}
        </div>
        <div>
          <button
            onClick={downloadMeme}
            id="downloadButton"
            className={styles.downloadButton}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
