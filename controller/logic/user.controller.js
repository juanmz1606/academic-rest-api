/** Dto */
const userDto = require("../../model/dto/user.dto");
const helper = require("../helpers/general.helper")

exports.login = (req, res, next) => {
    userDto.login({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (data.length > 0) {
            let pass = helper.DecryptPassword(data[0].password);
            // console.log("Password en BD: " + pass);
            if (req.body.password === pass) {
                tk = helper.GenerateToken(data[0]);
                res.status(200).json(
                    {
                        token: tk
                    }
                );
            } else {
                res.status(400).json(
                    {
                        info: "Username or password are incorrect"
                    }
                );
            }
        }
    });
};

exports.getAll = (req, res, next) => {
    userDto.getAll({}, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
};

exports.getByCode = (req, res, next) => {
    userDto.getByCode({ code: req.params.code }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
};

exports.deleteUser = () => {
    userDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json();
    });
};