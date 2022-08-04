const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a Group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price'],
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image '],
    },
    images: {
      type: [String],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
      required: [true, 'Tour must have start Dates'],
    },
    secretTour: Boolean,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

//Doc middle ware : save pre hook works on inertOne and Create doesn't work on inertMany
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/*
tourSchema.pre('save', function (next) {
  console.log(`saving document **${this.slug}** ....`);
  next();
});
tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
*/

//Query middle ware  :
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  // console.log('secrets is reserved...');
  // this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`the Query took ${Date.now() - this.start} ms to complete `);
  delete this.start;
  // console.log(docs);
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
