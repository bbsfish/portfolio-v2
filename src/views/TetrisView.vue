<template>
  <div class="tetris-view">
    <h1>Vue3 Tetris</h1>
    <div class="game-area">
      <div class="game-board">
        <div v-for="(row, y) in board" :key="y" class="board-row">
          <div
            v-for="(cell, x) in row"
            :key="x"
            class="cell"
            :class="getCellClass(cell)"
          ></div>
        </div>
      </div>

      <div class="game-info">
        <h2>SCORE</h2>
        <p class="score">{{ score }}</p>

        <h2>NEXT</h2>
        <div class="next-tetromino" v-if="nextTetromino">
            <div v-for="(row, y) in nextTetromino.shape" :key="y" class="next-row">
                <div 
                    v-for="(cell, x) in row" 
                    :key="x"
                    class="cell"
                    :class="getCellClass(cell ? nextTetromino.id : 0)"
                ></div>
            </div>
        </div>


        <div v-if="isGameOver" class="game-over-overlay">
          <div class="message">
            <h2>GAME OVER</h2>
            <button @click="startGame">RESTART</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ゲーム設定
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// テトリミノの形状と色を定義
const TETROMINOES = {
  // 0: 空セル
  0: { shape: [[0]], colorClass: "cell-0" },
  // Iミノ
  1: {
    shape: [[1, 1, 1, 1]],
    colorClass: "cell-1",
    id: 1,
  },
  // Jミノ
  2: {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
    ],
    colorClass: "cell-2",
    id: 2,
  },
  // Lミノ
  3: {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
    ],
    colorClass: "cell-3",
    id: 3,
  },
  // Oミノ
  4: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    colorClass: "cell-4",
    id: 4,
  },
  // Sミノ
  5: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
    ],
    colorClass: "cell-5",
    id: 5,
  },
  // Tミノ
  6: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
    ],
    colorClass: "cell-6",
    id: 6,
  },
  // Zミノ
  7: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
    ],
    colorClass: "cell-7",
    id: 7,
  },
};

export default {
  name: "TetrisGame",
  data() {
    return {
      board: [],
      score: 0,
      isGameOver: false,
      gameInterval: null,
      
      currentTetromino: null,
      currentX: 0,
      currentY: 0,
      
      nextTetromino: null,
    };
  },
  mounted() {
    this.startGame();
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  },
  methods: {
    /**
     * ゲームを開始またはリセットします。
     */
    startGame() {
      this.board = this.createEmptyBoard();
      this.score = 0;
      this.isGameOver = false;
      this.nextTetromino = this.getRandomTetromino(); // まず「次のブロック」を準備
      this.spawnNewTetromino();                     // ブロックの登場処理は1回だけ呼ぶ

      if (this.gameInterval) clearInterval(this.gameInterval);
      this.gameInterval = setInterval(() => {
        if (!this.isGameOver) {
          this.moveDown();
        }
      }, 700);
    },

    /**
     * 空のゲームボードを生成します。
     * @returns {Array<Array<number>>} 2次元配列のゲームボード
     */
    createEmptyBoard() {
      return Array.from({ length: BOARD_HEIGHT }, () =>
        Array(BOARD_WIDTH).fill(0)
      );
    },
    
    /**
     * 新しいテトリミノを生成し、盤面に配置します。
     */
    spawnNewTetromino() {
        this.currentTetromino = this.nextTetromino || this.getRandomTetromino();
        this.nextTetromino = this.getRandomTetromino();
        
        this.currentX = Math.floor(BOARD_WIDTH / 2) - Math.floor(this.currentTetromino.shape[0].length / 2);
        this.currentY = 0;

        // ゲームオーバー判定
        if (this.checkCollision(this.currentTetromino.shape, this.currentX, this.currentY)) {
            this.isGameOver = true;
            clearInterval(this.gameInterval);
        } else {
            this.drawTetromino();
        }
    },

    /**
     * ランダムなテトリミノオブジェクトを返します。
     * @returns {object} テトリミノオブジェクト
     */
    getRandomTetromino() {
      const ids = Object.keys(TETROMINOES).filter(id => id !== '0');
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      return JSON.parse(JSON.stringify(TETROMINOES[randomId]));
    },

    /**
     * 盤面に現在のテトリミノを描画します。
     */
    drawTetromino() {
        this.currentTetromino.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== 0) {
                    const boardX = this.currentX + x;
                    const boardY = this.currentY + y;
                    if (boardY < BOARD_HEIGHT && boardX < BOARD_WIDTH) {
                        // Vueのリアクティビティをトリガーするために新しい配列を作成して置換
                        const newRow = [...this.board[boardY]];
                        newRow[boardX] = this.currentTetromino.id;
                        this.board[boardY] = newRow;
                    }
                }
            });
        });
    },

    /**
     * 盤面から現在のテトリミノを消去します。
     */
    clearTetromino() {
        this.currentTetromino.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== 0) {
                    const boardX = this.currentX + x;
                    const boardY = this.currentY + y;
                    if (boardY < BOARD_HEIGHT && boardX < BOARD_WIDTH) {
                       const newRow = [...this.board[boardY]];
                       newRow[boardX] = 0;
                       this.board[boardY] = newRow;
                    }
                }
            });
        });
    },
    
    /**
     * 衝突判定を行います。
     * @param {Array<Array<number>>} shape - テトリミノの形状
     * @param {number} posX - X座標
     * @param {number} posY - Y座標
     * @returns {boolean} 衝突した場合はtrue
     */
    checkCollision(shape, posX, posY) {
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            const newX = posX + x;
            const newY = posY + y;

            // 壁との衝突判定
            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return true;
            }
            // 他のブロックとの衝突判定
            if (newY >= 0 && this.board[newY] && this.board[newY][newX] !== 0) {
                return true;
            }
          }
        }
      }
      return false;
    },

    /**
     * キーボード操作を処理します。
     * @param {KeyboardEvent} e - キーボードイベント
     */
    handleKeyDown(e) {
      if (this.isGameOver) return;

      // ゲームで使うキーのリスト
      const gameKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];

      // 押されたキーがゲームのキーに含まれていたら、デフォルトの動作をキャンセル
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft": this.move(-1); break;
        case "ArrowRight": this.move(1); break;
        case "ArrowDown": this.moveDown(); break;
        case "ArrowUp": this.rotate(); break;
      }
    },

    /**
     * テトリミノを左右に移動させます。
     * @param {number} dir - 移動方向 (-1: 左, 1: 右)
     */
    move(dir) {
      this.clearTetromino();
      if (!this.checkCollision(this.currentTetromino.shape, this.currentX + dir, this.currentY)) {
        this.currentX += dir;
      }
      this.drawTetromino();
    },

    /**
     * テトリミノを下に移動させます。
     */
    moveDown() {
        this.clearTetromino();
        if (!this.checkCollision(this.currentTetromino.shape, this.currentX, this.currentY + 1)) {
            this.currentY++;
            this.drawTetromino();
        } else {
            // 衝突したら固定して新しいミノを生成
            this.drawTetromino(); // 最後の位置に再描画
            this.lockTetromino();
        }
    },

    /**
     * テトリミノを回転させます。
     */
    rotate() {
        this.clearTetromino();
        const originalShape = this.currentTetromino.shape;
        const newShape = originalShape[0].map((_, colIndex) =>
            originalShape.map(row => row[colIndex]).reverse()
        );
        
        if (!this.checkCollision(newShape, this.currentX, this.currentY)) {
            this.currentTetromino.shape = newShape;
        }
        this.drawTetromino();
    },

    /**
     * テトリミノをボードに固定します。
     */
    lockTetromino() {
        this.clearLines();
        this.spawnNewTetromino();
    },

    /**
     * そろったラインを消去し、スコアを加算します。
     */
    clearLines() {
        let linesCleared = 0;
        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                linesCleared++;
                // 行を削除して、新しい空の行を先頭に追加
                this.board.splice(y, 1);
                this.board.unshift(Array(BOARD_WIDTH).fill(0));
                y++; // 同じ行を再度チェック
            }
        }
        // スコア加算 (例: 1行100点, 2行300点, 3行500点, 4行800点)
        if (linesCleared > 0) {
            const points = [0, 100, 300, 500, 800];
            this.score += points[linesCleared];
        }
    },

    /**
     * セルの値に応じたCSSクラス名を返します。
     * @param {number} cellValue - セルの値
     * @returns {string} CSSクラス名
     */
    getCellClass(cellValue) {
      return TETROMINOES[cellValue]?.colorClass || "cell-0";
    },
  },
};
</script>

<style lang="scss" scoped>
// 色の定義
$colors: (
  cell-0: #1e1e1e, // 背景
  cell-1: #00ffff, // I (シアン)
  cell-2: #0000ff, // J (青)
  cell-3: #ff7f00, // L (オレンジ)
  cell-4: #ffff00, // O (黄)
  cell-5: #00ff00, // S (緑)
  cell-6: #800080, // T (紫)
  cell-7: #ff0000  // Z (赤)
);

// セルのサイズ
$cell-size: 28px;
$board-border-color: #999;

// CSSクラスの動的生成
@each $name, $color in $colors {
  .#{$name} {
    background-color: $color;
  }
}

.tetris-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #282c34;
  color: white;
  min-height: 100vh;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px #000;
  }
}

.game-area {
  display: flex;
  justify-content: center;
  gap: 30px;
  border: 4px solid $board-border-color;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.game-board {
  display: grid;
  grid-template-rows: repeat(20, $cell-size);
  border: 2px solid $board-border-color;
  position: relative; // Game Overオーバーレイのため

  .board-row {
    display: flex;
  }

  .cell {
    width: $cell-size;
    height: $cell-size;
    box-sizing: border-box;
    border: 1px solid #444;
  }
}

.game-info {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    margin: 15px 0 5px 0;
    font-size: 1.5rem;
  }

  .score {
    font-size: 2rem;
    font-weight: bold;
    color: #4caf50;
    margin-bottom: 20px;
  }
}

.next-tetromino {
    border: 2px solid $board-border-color;
    padding: 10px;
    background-color: #1e1e1e;
    .next-row {
        display: flex;
    }
    .cell {
        width: 20px;
        height: 20px;
    }
}


.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  z-index: 10;
  flex-direction: column;

  .message {
      h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #ff4136;
      }
      button {
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          background-color: #4caf50;
          color: white;
          border-radius: 5px;
          &:hover {
              background-color: #45a049;
          }
      }
  }
}
</style>