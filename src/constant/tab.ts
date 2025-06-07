import { DefaultActiveTab } from "@/interface/tab";

export const defaultActiveTab: DefaultActiveTab = {
    family: {
        familyTrxName: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: "?tab=details",
                updateTab: "?tab=update"
            }
        },
        familyTrx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        familyBank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        familyLoan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        familyShopkeeper: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        }
    },
    member: {
        memberTrx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        memberTrxName: {
            defaultActive: {
                assign: "assign",
                details: 'details',
                update: "update"
            },
            queryString: {
                assignTab: "?tab=assign",
                detailsTab: "?tab=details",
                updateTab: '?tab=update'
            }
        },
        memberBank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        memberLoan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        memberShopkeeper: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        }
    }
}

export const {family:familyTab,member:memberTab} = defaultActiveTab