package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type City struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// Don't use a library so can run easily from `npm`
func main() {
	origins := []City{
		{1, "Manchester"},
		{2, "Bradford"},
		{3, "Hull"},
		{4, "Liverpool"},
	}

	destinations := map[string][]City{
		"1": {{2, "Bradford"}, {3, "Hull"}},
		"2": {{3, "Hull"}},
		"4": {{1, "Manchester"}, {3, "Hull"}},
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		w.Header().Set("Content-Type", "application/json")

		if r.URL.Path == "/origins" {
			json.NewEncoder(w).Encode(origins)
			return
		}

		if r.URL.Path == "/destinations" {
			origin := r.URL.Query().Get("origin")
			if dest, ok := destinations[origin]; ok {
				json.NewEncoder(w).Encode(dest)
			} else {
				json.NewEncoder(w).Encode([]City{})
			}
			return
		}
		w.WriteHeader(http.StatusNotFound)
	})

	port := 3001
	log.Printf("http://localhost:%d/origins\n", port)
	log.Printf("http://localhost:%d/destinations?origin=1\n", port)
	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
