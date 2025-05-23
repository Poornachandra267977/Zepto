import axios from 'axios';

export const getProductAPI = async(category,params) => {
    // console.log(category,"sanjay")
    let res = await axios.get(`https://zeptojson.onrender.com/${category}`,
    params
    )
    let data = res.data;

    return {data}
}

