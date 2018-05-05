import 'materialize-css/dist/css/materialize.min.css'; 
import '../assets/css/app.css';
import React, {Component} from 'react';
import List from './list';
import AddItem from './add-items';
import listData from '../helpers/list_data';
import axios from 'axios';

const BASE_URL ='http://api.reactprototypes.com';
const API_KEY = '?key=c318samskarvan';

class App extends Component{
    constructor(props){
        super(props);

        this.state={
            listData: []
        };
    }

    componentDidMount(){
        this.getListData();
    }
    async getListData(){
        const response = await axios.get(`${BASE_URL}/todos${API_KEY}`);

        this.setState({listData:response.data.todos});

        // axios.get(`${BASE_URL}/todos${API_KEY}`).then(res=>{
        //     console.log(res.data.todos);

        //     this.setState({listData: res.data.todos});
        // })
    }
    async addItem(item){
       await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
       this.getListData();
    }

    async deleteItem(id){
        await axios.delete(`${BASE_URL}/todos/${id+API_KEY}`);
        this.getListData();
        // const listData = this.state.listData.slice();

        // listData.splice(index,1);

        // this.setState({listData});s
    }
    render(){
        return(
    <div className="container">
        <h1 className="center">To Do List</h1>
        <AddItem add={this.addItem.bind(this)}/>
        <List data={this.state.listData} delete={this.deleteItem.bind(this)}/>
    </div>
);
    }
}

export default App;
