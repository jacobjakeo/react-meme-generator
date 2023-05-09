import axios from 'axios';
import React, { useState } from 'react';
import styles from './App.module.css';
import pixelsun from './pixelsun.png';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('doge');
  const [memeUrl, setMemeUrl] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'topText') {
      setTopText(value);
    } else if (name === 'bottomText') {
      setBottomText(value);
    }
  }

  function handleTemplateChange(event) {
    setMemeTemplate(event.target.value);
  }

  function generateMeme() {
    const url = `https://api.memegen.link/images/${memeTemplate}/${encodeURIComponent(
      topText,
    )}/${encodeURIComponent(bottomText)}.png`;
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

  return (
    <div className={styles.App}>
      <div className={styles.topDiv}>
        <h1 className={styles['font-face-gm']}>MEME GENERATOR</h1>
      </div>
      <form>
        <div className={styles['left-column']}>
          <div>
            <label htmlFor="topText" className={styles.textInputs}>
              Top text
              <input
                className={styles.textInputs}
                name="topText"
                value={topText}
                onChange={handleInputChange}
                placeholder="CSS"
              />
            </label>
          </div>
          <div>
            <label htmlFor="bottomText" className={styles.textInputs}>
              Bottom text
              <input
                className={styles.textInputs}
                name="bottomText"
                value={bottomText}
                onChange={handleInputChange}
                placeholder="drives me crazy"
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
      </form>
      <div className={styles['middle-column']}>
        <h2>CHOOSE YOUR FIGHTER</h2>
        <select value={memeTemplate} onChange={handleTemplateChange}>
          <option value="doge">Doge</option>
          <option value="spongebob">SpongeBob</option>
          <option value="drake">Drake</option>
          <option value="oprah">Oprah</option>
          <option value="sadfrog">Sad Frog</option>
          <option value="fine">This is Fine Dog</option>
          <option value="ugandanknuck">Knuckles</option>
        </select>
      </div>
      <div className={styles['right-column']}>
        <div className={styles.grid}>
          <img src={pixelsun} className={styles.pixelSun} alt="pixel-sun" />
          <img
            src="https://api.memegen.link/images/kermit.jpg"
            className={styles.loadImage}
            data-test-id="meme-image"
            alt="kermit"
          />
          {memeUrl !== '' && (
            <img
              src={memeUrl}
              alt="Generated Meme"
              className={styles['meme-image']}
              data-test-id="meme-image"
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
