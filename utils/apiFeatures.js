class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1A) Filtering
    //build query object using basic filters
    const queryObj = { ...this.queryString };
    const excludedQueries = ['page', 'sort', 'fields', 'limit'];
    excludedQueries.forEach((el) => delete queryObj[el]);

    //1B) Filtering advanced
    //refactoring the query for the advanced filters
    const tempQuery = JSON.stringify(queryObj).replace(
      /\b(lte|lt|gte|gt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(tempQuery));
    return this;
  }

  sort() {
    //2)Sorting
    if (this.queryString.sort) {
      // query.sort(price duration)
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  limitFields() {
    //3)Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    //page request is not available will return nothing extra
    return this;
  }
}
module.exports = APIFeatures;
