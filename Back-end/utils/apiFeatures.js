class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 50;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      throw new Error("Page and limit must be greater than or equal to 1");
    }

    this.query = this.query.skip(skip).limit(limit);

    this.pagination = { page, limit };

    return this;
  }

  filterByCategory() {
    if (this.queryString.category) {
      const categories = this.queryString.category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      if (categories.length) {
        this.query = this.query.find({
          $or: categories.map((category) => ({
            category: { $regex: `^${category}$`, $options: "i" },
          })),
        });
      }
    }
    return this;
  }
}

module.exports = APIFeatures;
