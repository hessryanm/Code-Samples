#include "Board.h"
#include "History.h"
#include <iostream>

Board::Board(){
	for (int row = 0; row < 8; row++){
		for (int col = 0; col < 8; col++){
			pieces[index(row, col)] = NULL;
		}
	}
}

Board::~Board(){
	for (int row = 0; row < 8; row++){
		for (int col = 0; col < 8; col++){
			if (pieces[index(row, col)] != NULL){
				delete pieces[index(row,col)];
				pieces[index(row,col)] = NULL;
			}
		}
	}
}

Piece * Board::piece_at(const int row, const int col){
	return pieces[index(row, col)];
}

void Board::set_piece(Piece * p, int row, int col){
	remove_piece(row, col);
	pieces[index(row, col)] = p;
}

void Board::remove_piece(int row, int col){
	if (pieces[index(row,col)] == NULL) return;
	delete pieces[index(row,col)];
	pieces[index(row, col)] = NULL;
}

//returns 0 if no check, 1 if white is in check, 2 if black is in check
int Board::movePiece(int srow, int scol, int erow, int ecol, History & h){
	h.add(piece_at(srow, scol), srow, scol, erow, ecol, *this);
	piece_at(srow, scol)->moved();
	piece_color moving_color = piece_at(srow, scol)->getColor();
	piece_color opposing;
	if (moving_color == WHITE){
		opposing = BLACK;
	} else{
		opposing = WHITE;
	}
	remove_piece(erow, ecol);
	set_piece(piece_at(srow, scol), erow, ecol);
	pieces[index(srow, scol)] = NULL;
	if (inCheck(opposing)){
		if (opposing == BLACK) return 2;
		else return 1;
	}
	return 0;
}

bool Board::inCheck(piece_color c){
	set<Position> attackpos;
	int row = 0;
	int col = 0;
	for (row = 0; row < 8; row ++){
		for (col = 0; col < 8; col ++){
			Piece * temp = piece_at(row, col);
			if (temp != NULL && temp->getColor() == c && temp->getType() == KING) break;
		}
		if (col != 8) break;
	}
	for (int prow = 0; prow < 8; prow++){
		for (int pcol = 0; pcol < 8; pcol++){
			Piece * temp = piece_at(prow, pcol);
			if (temp != NULL && temp->getColor() != c){
				attackpos.clear();
				Position mine(prow, pcol);
				temp->getValidMoves(attackpos, mine, *this);
				if (canAttack(attackpos, row, col)) return true;
			}
		}
	}
	return false;
}

bool Board::canAttack(set<Position> & attackpos, int row, int col){
	if (attackpos.size() == 0) return false;
	set<Position>::iterator myit;
	for(myit = attackpos.begin(); myit != attackpos.end(); myit++){
		Position poss_move = *myit;
		if (poss_move.row == row && poss_move.col == col) return true;
	}
}

Move * Board::undo(History & h){
	//cout << "Here" << endl;
	try{
		Move * last = h.undo();
		MoveRecord * origin = last->getOrigin();
		MoveRecord * dest = last->getDest();
		MoveRecord * capt = last->getCaptured();
		int srow = origin->getPos()->row;
		int scol = origin->getPos()->col;
		int erow = dest->getPos()->row;
		int ecol = dest->getPos()->col;
		piece_type movedType = origin->getType();
		piece_color movedColor = origin->getColor();
		Piece * moved = NULL;
		remove_piece(erow, ecol);

		moved = newPiece(movedType, movedColor);
		set_piece(moved, srow, scol);

		if(capt != NULL){
			piece_type captType = capt->getType();
			piece_color captColor = capt->getColor();
			Piece * capt_piece = NULL;

			capt_piece = newPiece(captType, captColor);
			set_piece(capt_piece, erow, ecol);
		}
		return last;
	} catch (NoMoreHistoryException &e){
		throw e;
	}
}

Piece * Board::newPiece(piece_type t, piece_color c){
	if (t == QUEEN){
		return new Queen(c, t);
	} else if (t == KNIGHT){
		return new Knight(c, t);
	} else if (t == ROOK){
		return new Rook(c, t);
	} else if (t == BISHOP){
		return new Bishop(c, t);
	} else if (t == KING){
		return new King(c, t);
	} else{
		return new Pawn(c, t);
	}
}

void Board::getValidMoves(set<Position> & toHighlight, int row, int col, History & h){
	toHighlight.clear();
	Piece * moving = piece_at(row, col);
	//cout << "(" << row << "," << col << "): " << moving->getType() << endl;
	if (moving == NULL) return;
	valid_moves.clear();
	Position mine(row, col);
	moving->getValidMoves(valid_moves, mine, *this);
	if (valid_moves.size() == 0) return;
	piece_color color = moving->getColor();
	set<Position>::iterator myit;
	for (myit = valid_moves.begin(); myit != valid_moves.end(); myit++){
		int erow = myit->row;
		int ecol = myit->col;
		movePiece(row, col, erow, ecol, h);
		if (!inCheck(color)) toHighlight.insert(Position(erow, ecol));
		Move * pointer = undo(h);
		delete pointer;
	}
	//cout << "Size at the end of board.getValidMoves(): " << toHighlight.size() << endl;
}

int Board::index(int row, int col){
	return row*8 + col;
}

void Board::initGame(){
	pieces[index(0,0)] = new Rook(BLACK, ROOK);
	pieces[index(0,1)] = new Knight(BLACK, KNIGHT);
	pieces[index(0,2)] = new Bishop(BLACK, BISHOP);
	pieces[index(0,3)] = new Queen(BLACK, QUEEN);
	pieces[index(0,4)] = new King(BLACK, KING);
	pieces[index(0,5)] = new Bishop(BLACK, BISHOP);
	pieces[index(0,6)] = new Knight(BLACK, KNIGHT);
	pieces[index(0,7)] = new Rook(BLACK, ROOK);

	for (int col = 0; col < 8; col++){
		pieces[index(1, col)] = new Pawn(BLACK, PAWN);
	}

	pieces[index(7,0)] = new Rook(WHITE, ROOK);
	pieces[index(7,1)] = new Knight(WHITE, KNIGHT);
	pieces[index(7,2)] = new Bishop(WHITE, BISHOP);
	pieces[index(7,3)] = new Queen(WHITE, QUEEN);
	pieces[index(7,4)] = new King(WHITE, KING);
	pieces[index(7,5)] = new Bishop(WHITE, BISHOP);
	pieces[index(7,6)] = new Knight(WHITE, KNIGHT);
	pieces[index(7,7)] = new Rook(WHITE, ROOK);

	for (int col = 0; col < 8; col++){
		pieces[index(6, col)] = new Pawn(WHITE, PAWN);
	}
}
