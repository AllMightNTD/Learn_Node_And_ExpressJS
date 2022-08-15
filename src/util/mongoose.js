module.exports = {
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((mongooses) => mongooses.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
