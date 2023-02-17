import axios from "axios";

export default {
    getOwnedBooks: function(id) {
        console.log(id)
        return axios.get(`/api/users/${id}`)
    },
    addOwnedBook: function(id, book) {
        console.log(id)
        return axios.put(`/api/users/added/${id}`, book)
        //may have to change to 3001 to avoid cors policy
    },
    deleteOwnedBook: function(id) {
        console.log(id)
        return axios.delete(`/api/books/${id}`)
    },
    requestToRent: function(id, user) {
        console.log(id)
        console.log(user)
        return axios.put(`/api/books/${id}`, {userId: user});
    },
    getAllOwnedBooks: function() {
        // console.log("hello")
        return axios.get(`/api/books`)
    },
    bookRented: function(id, book) {
        console.log(id)
        console.log(book)
        return axios.put(`/api/users/rent/${id}`, {bookId: book})
    },
    bookAvailable: function(id, book) {
        console.log(id)
        console.log(book)
        return axios.put(`api/users/return/${id}`, {bookId: book})
    },
    // bookReturn: function(id) {
    //     return axios.put(`api/books/${id}`, {bookId})
    // }
}