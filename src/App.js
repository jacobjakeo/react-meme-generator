import FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeTemplate, setMemeTemplate] = useState('');
  const downloadUrl = `https://api.memegen.link/images/${
    memeTemplate ? memeTemplate : 'bender'
  }/${topText ? topText : '_'}/${bottomText ? bottomText : '_'}.png`;
  const [imageUrl, setImageUrl] = useState(
    `https://api.memegen.link/images/bender.png`,
  );
  const saveFile = () => {
    FileSaver.saveAs(downloadUrl, 'meme.png');
  };
  const generateMeme = () => {
    if (topText || bottomText || memeTemplate) {
      setImageUrl(downloadUrl);
    } else {
      setImageUrl(`https://api.memegen.link/images/${memeTemplate}`);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.MainText}>React Meme Generator</div>
      <div>
        <div>
          <div className={styles.MemeTemplateText}>
            <label>
              Meme template
              <input
                value={memeTemplate}
                onChange={(event) => {
                  setMemeTemplate(event.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    generateMeme(e.target.value);
                  }
                }}
              />
            </label>
          </div>
          <div className={styles.MemeTemplateText}>
            <label>
              Top text
              <br />
              <input
                value={topText}
                onChange={(event) => {
                  setImageUrl(
                    `https://api.memegen.link/images/${
                      memeTemplate || 'bender'
                    }/${event.currentTarget.value || ' '}/${bottomText}.png`,
                  );
                  setTopText(event.currentTarget.value);
                }}
              />
            </label>
          </div>

          <div className={styles.MemeTemplateText}>
            <label>
              Bottom text
              <input
                value={bottomText}
                onChange={(event) => {
                  setImageUrl(
                    `https://api.memegen.link/images/${
                      memeTemplate || 'bender'
                    }/${topText}/${event.currentTarget.value || ' '}.png`,
                  );
                  setBottomText(event.currentTarget.value);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div>
        <img
          data-test-id="meme-image"
          src={imageUrl}
          alt="generated meme"
          className={styles.memeTemplate}
        />
        <button
          onClick={() => setImageUrl(downloadUrl)}
          className={styles.startButton}
        >
          Generate
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            console.log(downloadUrl);
            setImageUrl(downloadUrl);
            saveFile();
          }}
          className={styles.downloadButton}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
