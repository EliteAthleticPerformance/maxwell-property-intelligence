// ========================================
// MPI Saved Deals Service
// ========================================

class SavedDealsService {

    STORAGE_KEY = "mpiSavedDeals";

    //----------------------------------
    // Get Saved Deals
    //----------------------------------

    getDeals(){

        return JSON.parse(

            localStorage.getItem(
                this.STORAGE_KEY
            )

        ) || [];

    }

    //----------------------------------
    // Save Deal
    //----------------------------------

    save(deal){

        const deals =
            this.getDeals();

        const exists =
            deals.some(d =>
                d.type === deal.type &&
                d.city === deal.city
            );

        if(exists){

            return false;

        }

        deals.unshift({

            ...deal,

            savedAt:
                new Date().toISOString()

        });

        localStorage.setItem(

            this.STORAGE_KEY,

            JSON.stringify(deals)

        );

        return true;

    }

    //----------------------------------
    // Remove Deal
    //----------------------------------

    remove(type){

        const deals =
            this.getDeals()
                .filter(d =>
                    d.type !== type
                );

        localStorage.setItem(

            this.STORAGE_KEY,

            JSON.stringify(deals)

        );

    }

    //----------------------------------
    // Clear
    //----------------------------------

    clear(){

        localStorage.removeItem(
            this.STORAGE_KEY
        );

    }

}

const savedDealsService =
    new SavedDealsService();