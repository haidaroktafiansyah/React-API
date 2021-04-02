import React, { Component } from "react";
import Post from "../Post/Post";
import './BlogPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class BlogPost extends Component {

    state = {
        listArtikel: [],
        listArtikel2: [],
        insertArtikel: {
            userId: 1,
            id: 1,
            nama: "",
            harga: "",
            stok: "",
            link_gambar: "",
        }
    }


    ambilDataDariServerAPI = async () => {
        await fetch('http://localhost:3001/posts')
            .then(response => response.json())
            .then(jsonHasilAmbilDariApi => {
                this.setState({
                    listArtikel: jsonHasilAmbilDariApi
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    // handleHapusArtikel = (data) => {
    //     fetch(`http://localhost:3001/posts/${data}`, { method: 'DELETE' })
    //         .then(res => {
    //             this.ambilDataDariServerAPI()
    //         })
    // }

    // handleTambahArtikel = (event) => {
    //     let formInsertArtikel = { ...this.state.insertArtikel };
    //     let timestamp = new Date().getTime();
    //     formInsertArtikel['id'] = timestamp;
    //     formInsertArtikel[event.target.name] = event.target.value;
    //     this.setState({
    //         insertArtikel: formInsertArtikel
    //     });
    // }

    // handleTombolSimpan = () => {
    //     fetch('http://localhost:3001/posts', {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertArtikel)
    //     })

    //         .then((Response) => {
    //             this.ambilDataDariServerAPI();
    //         })
    // }

    ambilSatuData = (data) => {
        fetch(`http://localhost:3001/posts/${data}`)
            .then(response => response.json())
            .then(jsonHasilAmbilDariApi => {
                this.setState({
                    listArtikel2: jsonHasilAmbilDariApi
                })
            })
            .then(this.handleinsertjson())
    }

    handleinsertjson = () => {
        let formInsertArtikel = { ...this.state.insertArtikel };
        let timestamp = new Date().getTime();
        formInsertArtikel['id'] = timestamp;
        formInsertArtikel['nama'] = this.state.listArtikel2['nama'];
        formInsertArtikel['harga'] = this.state.listArtikel2['harga'];
        formInsertArtikel['stok'] = this.state.listArtikel2['stok'];
        formInsertArtikel['link_gambar'] = this.state.listArtikel2['link_gambar'];
        this.setState({
            insertArtikel: formInsertArtikel

        });
        console.log(this.state.insertArtikel);
    }

    handleTambahKeranjang = (data) => {
        this.ambilSatuData(data);


        if (this.state.insertArtikel['nama'] !== "" && this.state.insertArtikel['nama'] !== undefined) {
            fetch('http://localhost:3002/posts', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.insertArtikel)
            })

                .then((Response) => {
                    this.ambilDataDariServerAPI();
                })
        }
        else {
            this.handleinsertjson();
            console.log("retry");
        }

    }

    render() {
        return (
            <div className="post-artikel">
                <h2>Daftar Belonjoan</h2>

                <div className="row">

                    {
                        this.state.listArtikel.map(artikel => {
                            return <Post gambar={artikel.link_gambar} key={artikel.id} judul={artikel.nama} isi={artikel.harga} idArtikel={artikel.id} stok={artikel.stok} hapusArtikel={this.handleHapusArtikel} tambahKeranjang={this.handleTambahKeranjang} />
                        })
                    }
                </div>

            </div>
        )
    }
}

export default BlogPost;