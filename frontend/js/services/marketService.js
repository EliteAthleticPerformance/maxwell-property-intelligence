// ========================================
// Load Market Data
// Future:
// 1. Cache
// 2. API
// 3. Database
// 4. Demo Data (fallback)
// ========================================

// ========================================
// Market Service
// Maxwell Property Intelligence
// ========================================

// ========================================
// Market Service
// Maxwell Property Intelligence
// ========================================

class MarketService {

    // ========================================
    // Load Market Data
    // ========================================

    loadMarket(city){

        // Exact city match
        const cityMarket = this.getCityMarket(city);

        if(cityMarket){
            return cityMarket;
        }

        // State fallback
        const stateMarket = this.getStateMarket(city);

        if(stateMarket){
            return stateMarket;
        }

        // Future:
        // return this.getNationalMarket();

        return null;

    }

    // ========================================
    // City Market Data
    // ========================================

    getCityMarket(city){

        const cities = {

            "Kansas City, MO": {
                inventoryMonths: 2.1,
                rentGrowth: 5.2,
                vacancyRate: 4.1,
                appreciation: 6.4,
                interestRate: 6.75,
                employmentGrowth: 2.3
            },

            "Lee's Summit, MO": {
                inventoryMonths: 1.8,
                rentGrowth: 5.8,
                vacancyRate: 3.2,
                appreciation: 7.1,
                interestRate: 6.75,
                employmentGrowth: 2.8
            },

            "Independence, MO": {
                inventoryMonths: 2.7,
                rentGrowth: 4.3,
                vacancyRate: 5.0,
                appreciation: 5.7,
                interestRate: 6.75,
                employmentGrowth: 1.9
            }

        };

        return cities[city] || null;

    }

    // ========================================
    // State Defaults
    // ========================================

    getStateMarket(city){

        const states = {

            "MO": {
                inventoryMonths: 3.2,
                rentGrowth: 4.4,
                vacancyRate: 5.2,
                appreciation: 5.1,
                interestRate: 6.75,
                employmentGrowth: 1.9
            },

            "KS": {
                inventoryMonths: 2.9,
                rentGrowth: 4.8,
                vacancyRate: 4.8,
                appreciation: 5.8,
                interestRate: 6.75,
                employmentGrowth: 2.1
            }

        };

        // Extract state abbreviation from "City, ST"
        const parts = city.split(",");

        if(parts.length < 2){
            return null;
        }

        const state = parts[1].trim();

        return states[state] || null;

    }

}

const marketService = new MarketService();