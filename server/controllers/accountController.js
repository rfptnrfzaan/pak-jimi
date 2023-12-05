/** @format */

import Account from "../models/modelAccount.js";

export const getAccount = async (req, res) => {
  try {
    const response = await Account.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getAccountById = async (req, res) => {
  try {
    const response = await Account.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (req, res) => {
  const account = await Account.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!account) return res.status(404).json({ msg: "No Data Found" });

  try {
    await Account.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Account Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAccount = async (req, res) => {
  const id = req.body.id;
  const jenis_akun = req.body.jenis_akun;
  const accountId = req.body.accountId;

  try {
    await Account.create({
      id: id,
      jenis_akun: jenis_akun,
      accountId: accountId,
    });
    res.status(201).json({ msg: "Account Created Succesfully!" });
  } catch (error) {
    console.log(error.message);
  }
};
