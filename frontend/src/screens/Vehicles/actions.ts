import axios from "axios";

import { API_URL } from "@/constants/srcConstants";

export const fetchVehicles = async ({ pageParam = 1 }) => {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')

    return axios
    .get(`${API_URL}/vehicles/public`, {
    params: { page: pageParam, per_page: 5 }
  })
    .then((response) => {
         console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP', response)
      return response.data
    })
    .catch((err) => err);
  
}