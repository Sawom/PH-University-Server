import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
// password bcrypt er kaj ei model ei

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// bcrypt
userSchema.pre("save", async function (next) {
  console.log(this, "pre hook: we have saved data");
  // hashing password and save to db.
  // hasssing bolte real password ta save kore na db te.
  const user = this;
  // BCRYPT_SALT_ROUNDS .env file e ekta score dite hobe.
  // erpor index.ts theke export korte hobe.
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//***  post save middleware/hook *** password empty kore dibo
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
}); // pass empty done

export const User = model<TUser>('User', userSchema);