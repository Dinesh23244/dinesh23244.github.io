import urllib.request
import json
import sys

# Target ORCID iD
ORCID_ID = "0000-0001-9752-9434"
URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"

def fetch_orcid_works():
    print(f"Fetching ORCID cache for {ORCID_ID}...")
    req = urllib.request.Request(URL, headers={'Accept': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                
                # Write raw response to publications.json
                with open('publications.json', 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4)
                
                works_count = len(data.get('group', []))
                print(f"Success! Cached {works_count} work groups to publications.json.")
            else:
                print(f"Failed to fetch data. HTTP Status: {response.status}")
                sys.exit(1)
    except Exception as e:
        print(f"Error fetching ORCID data: {e}")
        sys.exit(1)

if __name__ == "__main__":
    fetch_orcid_works()
