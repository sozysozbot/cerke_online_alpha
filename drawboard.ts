
const BOX_SIZE = 70;
const MAX_PIECE_SIZE = BOX_SIZE - 1;
const PIECE_SIZE = 60;

type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function drawPieceOnBoard(coord: Coord, path: string) {
    let [row_index, column_index] = coord;
    let i = document.createElement("img");
    i.classList.add("piece_image_on_board");
    i.style.top = `${1 + row_index * BOX_SIZE + (MAX_PIECE_SIZE - PIECE_SIZE) / 2}px`;
    i.style.left = `${1 + column_index * BOX_SIZE + (MAX_PIECE_SIZE - PIECE_SIZE) / 2}px`;
    i.src = `image/${path}.png`;
    i.width = PIECE_SIZE;
    i.height = PIECE_SIZE;
    return i;
}

function profToPath(prof: Profession): string {
    if (prof === Profession.Dau2) return "dau";
    if (prof === Profession.Gua2) return "gua";
    if (prof === Profession.Io) return "io";
    if (prof === Profession.Kauk2) return "kauk";
    if (prof === Profession.Kaun1) return "kaun";
    if (prof === Profession.Kua2) return "kua";
    if (prof === Profession.Maun1) return "maun";
    if (prof === Profession.Nuak1) return "nuak";
    if (prof === Profession.Tuk2) return "tuk";
    if (prof === Profession.Uai1) return "uai";
    
    let _should_not_reach_here : never = prof;
    return _should_not_reach_here;
}

function sideToPath(side: Side): string {
    if (side === Side.Downward) return "piece_rev";
    if (side === Side.Upward) return "piece";

    let _should_not_reach_here : never = side;
    return _should_not_reach_here;
}

function colorToPath(color: Color): string {
    if (color === Color.Huok2) return "b";
    if (color === Color.Kok1) return "r";

    let _should_not_reach_here: never = color;
    return _should_not_reach_here;
}

function toPath(p: NonTam2Piece): string {
    return `${sideToPath(p.side)}/${colorToPath(p.color)}${profToPath(p.prof)}`
}

const sampleBoard: Board = [
    [{color: Color.Huok2, prof: Profession.Dau2, side: Side.Upward}, 
        null, null, { color: Color.Kok1, prof: Profession.Dau2, side: Side.Upward }, null, null, null, null, null],
    [null, null, { color: Color.Kok1, prof: Profession.Dau2, side: Side.Downward }, null, null, null, null, null, null],
    [{ color: Color.Kok1, prof: Profession.Kauk2, side: Side.Upward }, "Tam2", "Tam2", null, { color: Color.Kok1, prof: Profession.Dau2, side: Side.Upward }, null, null, null, null],
    [null, { color: Color.Huok2, prof: Profession.Kaun1, side: Side.Upward }, "Tam2", null, null, null, null, null, null],
    [null, null, null, { color: Color.Huok2, prof: Profession.Dau2, side: Side.Upward }, { color: Color.Huok2, prof: Profession.Dau2, side: Side.Upward }, null, null, null, null],
    [{ color: Color.Huok2, prof: Profession.Dau2, side: Side.Upward }, 
        null, null, null, null, null, null, null, null],
    [null, null, null, { color: Color.Huok2, prof: Profession.Kaun1, side: Side.Upward }, null, null, { color: Color.Kok1, prof: Profession.Tuk2, side: Side.Upward }, null, null],
    [null, null, { color: Color.Kok1, prof: Profession.Io, side: Side.Upward }, null, null, null, null, { color: Color.Kok1, prof: Profession.Kauk2, side: Side.Upward }, null],
    [null, { color: Color.Huok2, prof: Profession.Kauk2, side: Side.Upward }, null, { color: Color.Huok2, prof: Profession.Maun1, side: Side.Upward }, null, null, null, { color: Color.Kok1, prof: Profession.Kauk2, side: Side.Upward }, "Tam2"]
];

type GAME_STATE = {
    currentBoard: Board
};

let GAME_STATE = {
    currentBoard: [
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"],
        [null, null, null, null, null, null, null, null, "Tam2"]
    ] as Board
}

type UI_STATE = {
    selectedCoord: null | Coord;
};

let UI_STATE: UI_STATE = {
    selectedCoord: null
};

function eraseGuide() {
    let contains_guides = document.getElementById("contains_guides")!;

    // delete everything
    while (contains_guides.firstChild) {
        contains_guides.removeChild(contains_guides.firstChild);
    }
}

function drawYellowGuideOnBoard(coord: Coord) {
    let [row_index, column_index] = coord;
    let i = document.createElement("img");
    i.classList.add("guide");
    i.style.top = `${1 + row_index * BOX_SIZE + (MAX_PIECE_SIZE - MAX_PIECE_SIZE) / 2}px`;
    i.style.left = `${1 + column_index * BOX_SIZE + (MAX_PIECE_SIZE - MAX_PIECE_SIZE) / 2}px`;
    i.src = `image/ct.png`;
    i.width = MAX_PIECE_SIZE;
    i.height = MAX_PIECE_SIZE;
    i.style.cursor = "pointer";
    i.style.opacity = "0.3";

    // click on it to erase
    i.addEventListener('click', function () {
        alert("implement me");
    });
    return i;
}

function drawSelectednessOnBoard(coord: Coord) {
    let [row_index, column_index] = coord;
    let i = document.createElement("img");
    i.classList.add("selection");
    i.style.top = `${1 + row_index * BOX_SIZE + (MAX_PIECE_SIZE - PIECE_SIZE) / 2}px`;
    i.style.left = `${1 + column_index * BOX_SIZE + (MAX_PIECE_SIZE - PIECE_SIZE) / 2}px`;
    i.src = `image/selection2.png`;
    i.width = PIECE_SIZE;
    i.height = PIECE_SIZE;
    i.style.cursor = "pointer";

    // click on it to erase
    i.addEventListener('click', function() {
        eraseGuide();
        UI_STATE.selectedCoord = null;
    });
    return i;
}



function coordEq(a: Coord, b: Coord): boolean {
    return a[0] === b[0] && a[1] === b[1];
}


function isTamHue(coord: Coord, board: Readonly<Board>): boolean
{
    // unconditionally TamHue
    if (coordEq(coord, [2, 2]) || coordEq(coord, [2, 6]) || 
        coordEq(coord, [3, 3]) || coordEq(coord, [3, 5]) || 
        coordEq(coord, [4, 4]) || 
        coordEq(coord, [5, 3]) || coordEq(coord, [5, 5]) || 
        coordEq(coord, [6, 2]) || coordEq(coord, [6, 6])
    ) {
        return true;
    }

    // is Tam2 available at any neighborhood?
    return eightNeighborhood(coord).some(([i, j]) => board[i][j] === "Tam2");
}



type Coord = Readonly<[BoardIndex, BoardIndex]>;

function showGuideOf(coord: Coord, sq: Piece) {
    const contains_guides = document.getElementById("contains_guides")!;
    const centralNode: HTMLImageElement = drawSelectednessOnBoard(coord);
    contains_guides.appendChild(centralNode);

    const guideList: Array<Coord> = calculateMovablePositions(coord, sq, GAME_STATE.currentBoard);

    for (let ind = 0; ind < guideList.length; ind++) {
        contains_guides.appendChild(drawYellowGuideOnBoard(guideList[ind]));
    }
    
}

function selectOwnPieceOnBoard(ev: MouseEvent, coord: Coord, sq: Piece, imgNode: HTMLImageElement) {
    const [i, j] = coord;
    console.log(ev, i, j, sq);

    if (UI_STATE.selectedCoord != null && UI_STATE.selectedCoord[0] === i && UI_STATE.selectedCoord[1] === j) {
        eraseGuide();
        UI_STATE.selectedCoord = null;
    } else {
        eraseGuide();
        UI_STATE.selectedCoord = coord;
        showGuideOf(coord, sq);
    }
    
}

function drawBoard(board: Board) {
    const contains_pieces_on_board = document.getElementById("contains_pieces_on_board")!;
    GAME_STATE.currentBoard = board;

    // delete everything
    while (contains_pieces_on_board.firstChild) {
        contains_pieces_on_board.removeChild(contains_pieces_on_board.firstChild);
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const sq: Piece | null = board[i][j];
            if (sq == null) {
                continue;
            } 
            
            const coord: Coord = [i as BoardIndex, j as BoardIndex];
            let imgNode: HTMLImageElement;
            let selectable;
            if (sq === "Tam2") {
                imgNode = drawPieceOnBoard(coord, "piece/tam");
                selectable = true;
            } else {
                imgNode = drawPieceOnBoard(coord, toPath(sq));
                selectable = (sq.side === Side.Upward);
            }

            if (selectable) {
                imgNode.style.cursor = "pointer";
                imgNode.addEventListener('click', function(ev){
                    selectOwnPieceOnBoard(ev, coord, sq, imgNode)
                });
            }

            contains_pieces_on_board.appendChild(imgNode);
        }
    }
}
