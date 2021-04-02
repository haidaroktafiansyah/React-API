import React, { Component } from "react";
import './BlogPost.css';

class InsertData extends Component {

    state = {
        listArtikel: [],
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

    handleHapusArtikel = (data) => {
        fetch(`http://localhost:3001/posts/${data}`, { method: 'DELETE' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahArtikel = (event) => {
        let formInsertArtikel = { ...this.state.insertArtikel };
        let timestamp = new Date().getTime();
        formInsertArtikel['id'] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value;
        this.setState({
            insertArtikel: formInsertArtikel
        });
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/posts', {
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

    render() {
        return (

            <div className="post-artikel">
                <h2>GAE INPUT DATA</h2>
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="harga" className="col-sm-2 col-form-label">Harga</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="harga" name="harga" rows="3" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="stok" className="col-sm-2 col-form-label">Stok</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="stok" name="stok" rows="4" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="stok" className="col-sm-2 col-form-label">Link Gambar</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="link_gambar" name="link_gambar" rows="5" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
            </div>
        )
    }
}

export default InsertData;