package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type City struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

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
		"3": {},
		"4": {{1, "Manchester"}, {3, "Hull"}},
	}

	// Don't use a library so can run file directly
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		w.Header().Set("Content-Type", "application/json")

		if r.URL.Path == "/origins" {
			json.NewEncoder(w).Encode(origins)
			return
		}

		if r.URL.Path == "/destinations" {
			q := r.URL.Query()
			origin := q.Get("origin")
			if origin != "" {
				json.NewEncoder(w).Encode(destinations[origin])
				return
			}
		}
		w.WriteHeader(http.StatusNotFound)
	})

	log.Println("http://localhost:30001/origins")
	log.Println("http://localhost:30001/destinations?origin=1")
	log.Fatalln(http.ListenAndServe(":3001", nil))
}
