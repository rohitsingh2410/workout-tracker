import axios from "axios";


export class ApiCalls{

    static async getPosts(type){
        let posts = await axios.get('https://jsonplaceholder.typicode.com/photos');

        return posts.data;

    }



} 