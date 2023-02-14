// définition d'un livre
export default class Chose {
  constructor(id, titre, qtestock, prix) {
    this._titre = titre;
    this._prix = prix;
    this._id = id;
    this._qtestock = qtestock;
  }
  get titre() {
    return this._titre;
  }
  get id() {
    return this._id;
  }
  pourAfficher() {
    return `--> ${this._titre}`;
  }
}
