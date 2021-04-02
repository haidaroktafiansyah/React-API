import React from "react";

const PostKeranjang = (props) => {
    return (
        <div className="col-md-4">
            <div className="artikel">
                <div className="gambar-artikel">
                    <img src={props.gambar} alt="Gambar Thumbnail Artikel" />
                </div>
                <div className="konten-artikel">

                    <div className="judul-artikel">Model : {props.judul}</div>
                    <p className="isi artikel">ID : {props.idArtikel}</p>
                    <p className="isi artikel">Harga : {props.isi}</p>
                    {/* <p className="isi artikel">{props.stok}</p> */}
                    {/* <button className="btn btn-sm btn-success" onClick={() => props.tambahKeranjang(props.idArtikel)}>Tambah Keranjang</button> */}
                    <button className="btn btn-sm btn-warning" onClick={() => props.hapusArtikel(props.idArtikel)}>Hapus</button>
                </div>
            </div>
        </div>
    )
}

export default PostKeranjang;