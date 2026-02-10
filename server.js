import express from 'express';
import dotenv from "dotenv";
import VKAPI from './api/vkAPI.js';
import saveToJSON from './json/saveJSON.js';
import WallAnalytic from './analytics/Analytic.js';
import FilterDate from './filters/filterByDate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const VK_ID = process.env.VK_ID;
const VK_SCOPE = process.env.VK_SCOPE;
const VK_REDIRECT = process.env.VK_REDIRECT;

const vkConfig = {
    clientId: process.env.VK_ID,
    clientScope: process.env.VK_SCOPE,
    clientRedirect: process.env.VK_REDIRECT
};

app.use(express.json());

app.get('/vk/auth', async (req, res) => {
    res.redirect(`https://oauth.vk.com/authorize?client_id=${VK_ID}&scope=${VK_SCOPE}&redirect_uri=${VK_REDIRECT}&display=page&response_type=token&revoke=1`);
});

app.post('/vk/parse', async (req, res) => {

    const  { vkToken, domainId, from, to} = req.body;

    if (!vkToken || !domainId || !from || !to) {
        return res.status(400).json({error: "Required fields are empty"});
    }

    try {
        const fromDate = new Date(from);
        const toDate = new Date (to);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({eror: "Invalid data format"});
        };

        if (toDate<fromDate) {
            return res.status(400).json({error: "to must be after from"});
        };

        const vk = new VKAPI(vkConfig);
        vk.setToken(vkToken);
        const analytic = new WallAnalytic(vk, new FilterDate());
        const period = {from: fromDate, to: toDate};
        const data = await analytic.getAll(domainId, period);

            const result = {
                analyticus: 'success',
                domain: domainId,
                period, 
                data
            };

            const file_name = `vk_${domainId}_${new Date().toISOString().slice(0,10)}.json`;

            await saveToJSON(file_name, result);

            res.status(200).json({result});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server listing on port: ${PORT}`);
});