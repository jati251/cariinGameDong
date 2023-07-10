import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [],
    localUrl: 'https://cariingameaja-server.jatisuryo.com/',
    game: [],
    wishlists: [],
    stores: []
  }),
  getters: {},
  actions: {
    async getGameDetail(id) {
      // console.log(id);
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.localUrl + 'gamedetail/' + id
        })
        // console.log(data.lodging);
        this.game = data.game
        this.router.push(`/gamedetail/${data.game.id}`)
        Swal.close()
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async findStore(id) {
      // console.log(id);
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.localUrl + 'gamestores/' + id
        })
        // console.log(data.lodging);
        this.stores = data.stores.results
      } catch ({ response }) {
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async fetchGames(query) {
      Swal.showLoading()
      console.log(query)
      try {
        let { search, dates, page, platforms } = query
        console.log(page)
        if (search) {
          search = `search=${search}&`
        }
        if (dates) {
          dates = `dates=${dates}&`
        }
        if (platforms) {
          platforms = `platforms=${platforms}&`
        }
        let { data } = await axios({
          method: 'GET',
          url: this.localUrl + 'games' + `?page=${page}&pagesize=24&${search}${dates}${platforms}`
        })
        console.log(data)
        this.games = data.games.results
        Swal.close()
      } catch ({ response }) {
        console.log(response)
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },
    async donateAdmin() {
      console.log('hey')
      try {
        const { data } = await axios({
          url: this.localUrl + 'donation',
          method: 'POST',
          headers: { access_token: localStorage.access_token }
        })
        console.log(data.token.redirect_url)
        window.location.href = data.token.redirect_url
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            alert('payment success!')
            console.log(result)
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert('wating your payment!')
            console.log(result)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert('payment failed!')
            console.log(result)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async addWishlist(payload) {
      const { gameName, id, imgUrl } = payload
      try {
        Swal.showLoading()
        let createWishlist = await axios({
          method: 'POST',
          url: this.localUrl + 'wishlist/' + id,
          headers: { access_token: localStorage.access_token },
          data: {
            gameName,
            imgUrl
          }
        })
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Game added to wishlist',
          showConfirmButton: false,
          timer: 1500
        })
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async getWishlist() {
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'GET',
          headers: { access_token: localStorage.access_token },
          url: this.localUrl + 'wishlist'
        })

        this.wishlists = data.wishList
        Swal.close()
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async deleteWishlist(id) {
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'DELETE',
          headers: { access_token: localStorage.access_token },
          url: this.localUrl + 'wishlist/' + id
        })
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Wishlist is deleted',
          showConfirmButton: false,
          timer: 1500
        })
        this.getWishlist()
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    }
  }
})
