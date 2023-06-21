// boardController.js
const Board = require('../database/models/Board');
const User = require('../database/models/User');
const FischerChessGeneration = require('../utils/fischerChessGeneration');



exports.getRandomBoard = (req, res) => {
  const lineup = FischerChessGeneration.generateLineup();
  res.json(lineup);
};



exports.saveBoard = async (req, res) => {
  try {
    const { configuration } = req.body;
    const { id: userId } = req.user;

    const newBoard = new Board({
      configuration,
      user: userId,
    });

    const savedBoard = await newBoard.save();

    const user = await User.findById(userId);
    user.savedBoards.push(savedBoard._id);
    await user.save();

    res.status(200).json(savedBoard);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};



exports.loadBoards = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId).populate('savedBoards');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.savedBoards);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



exports.addComment = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { boardId, comment } = req.body;

    // find board by boardId and userId to ensure it's the user's board
    const board = await Board.findOne({ _id: boardId, user: userId });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // update the board's comment
    board.comment = comment;
    await board.save();

    res.json({ success: 'Comment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteBoard = async (req, res) => {
  try {
    const { id: boardId } = req.params;

    console.log('Board ID:', boardId);

    const board = await Board.findById(boardId);
    if (!board) {
      console.log('Board not found');
      return res.status(404).json({ error: 'Board not found' });
    }

    console.log('Board:', board);

    await Board.deleteOne({ _id: boardId });

    console.log('Board removed');

    res.status(200).json({ success: true });
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: 'Server error', errorMessage: error.message });
  }
};
