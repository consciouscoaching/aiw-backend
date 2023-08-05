const promptModel = require("../models/prompt");

class PromptController {
  constructor() {
    // Constructor logic if needed
  }

  async create(req, res, next) {
    try {
      console.log("req.body:", req.body);
      const { title, content } = req.body;
      const response = await promptModel.create({
        title: title,
        content: content,
      });
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const response = await promptModel.findByIdAndUpdate(id, {
        title: title,
        content: content,
      });

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateByNum(req, res, next) {
    try {
      const { num, title, content } = req.body;
      const items = await promptModel.find({});
      console.log("items", items);
      let updateItem = items[num - 1];
      console.log("updateItem", updateItem);
      const response = await promptModel.findByIdAndUpdate(updateItem._id, {
        title: title,
        content: content,
      });

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const response = await promptModel.findByIdAndDelete(id);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await promptModel.find( req.query );

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PromptController();
