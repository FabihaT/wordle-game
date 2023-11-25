import './App.css';
import { darkMode, showHint, showInstructions } from "./wordle";

function App() {
  return (
    <div>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Wordle</title>
      </head>
      <body>
        <script src="./wordle.js"></script>
        <div className="page-header">
          <div className="head1"></div>
          <div className="head2">
            <h1>Wordle</h1>
          </div>
          <div className="head3">
              <nav>
                <ul className="icons">
                  <li><button id="dark" onClick={darkMode} className="buttonStyle">&#9681;</button></li>
                  <li><button id="hint" onClick={showHint} className="buttonStyle">&#63;</button></li>
                  <li><button id="instructions" onClick={showInstructions} className="buttonStyle">&#9432;</button></li>
                </ul>
              </nav>
          </div>
        </div>
        <main className="side-panel-closed hide-hint hide-img hide-answer">
          <div className="column1">
            <div id="board"></div>
            <div id="win-img"><img style={{width: '400px'}} src="https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif" alt="Congratulations"/></div>
            <div id="reset-button"></div>
            <div id="hint-text"></div>
            <div id="correct-answer"></div>
          </div>
          <div className="column2">
              <div style={{ padding: '40px 40px 0px 40px' }}>
                <h3>How To Play</h3>
                <ul className="in-list">
                    <li>Start typing. The letters will appear in the boxes.</li>
                    <li>Remove letters with a Backspace.</li>
                    <li>Hit Enter/Return to submit an answer.</li>
                    <li>Letters with green backgrounds are in the correct spot.</li>
                    <li>Letters with yellow backgrounds exist in the word, but are wrongly placed.</li>
                    <li>Letters with gray backgrounds do not exist in the word.</li>
                    <li>If you need a hint, click the <strong>&#63;</strong> button.</li>
                </ul>
              </div>
          </div>
        </main>
        <footer>
          <p>&#xA9; Fabiha Tuheen 2023</p>
        </footer>
      </body>

    </div>
  );
}

export default App;
