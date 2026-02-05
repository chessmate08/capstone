import { useEffect, useState } from 'react'
import { useAuth } from './auth'
import { useSearchParams, useNavigate,useLocation } from 'react-router-dom'
import * as styles from './inventory.module.css'
// Import CSS styles if needed, though they aren't used in the component body below.

function Items() {
    const { token } = useAuth()
    const navigate = useNavigate()
    const [shownItems, setShown] = useState(null)
    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [searchParams] = useSearchParams({ limit: "100", page: "1", partNumber: "" })
    const [filters, setFilters] = useState({ ...Object.fromEntries(searchParams) })
    const [scroll, setScroll] = useState(null)
    const [total, setTotal] = useState(0)
    
    

    
    useEffect(() => {
        const fetcher = async () => {
            
            const domain = window.CONFIG.API_URL || import.meta.env.VITE_domain;
            if (token) {
                var data = await fetch(`${domain}/api/getinventory`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    if (response.status == 401) {
                        throw new Error('Unauthorized')
                    } else if (! response.ok) {
                        throw new Error('auth fetching error')
                    }
                    return response.json()
                }).then(response => {
                    return response
                }).catch((e) => {
                    if (e.message == 'Unauthorized') {
                        navigate('/login', {admin: false})
                    }
                })
            } else {
                var data = await fetch(`${domain}/api/getinventory`).then((res) => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Network response was not ok");
                }).then(res => res).catch(e=> {
                    console.log(`error: ${e.message}`)
                })
            }
            setTotal(data.length)
            setItems(data);

        };
        fetcher();
    }, [token]);

    // Filter and paginate the items whenever filters, searchParams, or items change
    useEffect(() => {
        if (!items) return;
        try {
            const part = filters.partNumber;
            let limit = parseInt(filters.limit) ;
            let page = parseInt(filters.page) - 1;

            if (limit <= 0 || page < 0) {
                limit = 100;
                page = 0;
            }
            if (limit > 200) limit = 200;

            const filteredItems = items.filter((val) => val.partnum.includes(part.toUpperCase()));

            if (limit > filteredItems.length) limit = filteredItems.length;

            const totalPages = Math.ceil(filteredItems.length / limit);
            if (page >= totalPages && totalPages > 0) {
                page = totalPages - 1;
            } else if (totalPages == 0) {
                page = 0;
            }

            const start = page * limit;
            const end = start + limit;
            const show = filteredItems.slice(start, end);
            console.log({start, end, show});
            

            if (show.length > 0) {
                setShown(show);
            } else if (admin) {
                setShown([{ partnum: ' ', description: ' ', id: ' ' }]);
            } else {
                setShown([{ partnum: ' ', description: ' ' }]);
            }
            
            if (scroll) {
                setScroll({...scroll, change: ! scroll.change})
            }
        } catch (error) {
            console.error("Error processing items:", error);
        } finally {
            
            setLoading(false)
        }
    }, [filters, searchParams, items, admin]); 

    function filter(event) {
        const el = event.target
        switch (el.id) {
            case 'page':
                if (!isNaN(el.value)) {
                    setFilters({ ...Object.fromEntries(searchParams), ...filters, 'page': el.value })
                }
                break;
            case 'partNumber':
                setFilters({ ...Object.fromEntries(searchParams), ...filters, 'partNumber': el.value })
                
                break;
            case 'limit':
                if (!isNaN(el.value)) {
                    setFilters({ ...Object.fromEntries(searchParams), ...filters, 'limit': el.value })
                }
                break;
                

        }
    }
    function changePage(event) {
        event.preventDefault()
        const el = event.target
        switch (el.id) {
            case 'previous' :
                filter({target : {
                    id : 'page',
                    value : parseInt(filters.page) - 1 > 0 ? (parseInt(filters.page) - 1).toString() : '1'
                }})
                break;
            case 'next':
                filter({target : {
                    id: 'page',
                    value: parseInt(filters.page) + 1
                }})
        }
    }
    useEffect(()=> {
        
            window.scrollTo(0, document.body.scrollHeight + 20)
        

    }, [shownItems])
    // Check admin status
    useEffect(() => {
        if (token != null) {
            const checkAdmin = async () => {
                const domain = window.CONFIG.API_URL || import.meta.env.VITE_domain;
                await fetch(`${domain}/api/token/isadmin`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(response => {
                    if (response.status == 403) {
                        throw new Error("Unauthorized")
                    } else if (response.status == 404) { 
                        throw new Error("server responded with status of: 404 " + response.statusText)
                    } else {
                        return response.json()
                    }
                }).then(response => {
                    console.log(response)
                    setAdmin(response.admin)
                }).catch((e) => {
                    if (e.message == "Unauthorized") {
                        navigate('/login', {admin : false});
                    } else {
                        console.error(`error: ${e}`);
                    }
                })
            };
            checkAdmin();
        }
    }, [token, navigate, admin]);

    // The rendering logic must filter the 'id' out if the user is not an admin
    if (loading) {
        return (<center><h1>Loading...</h1></center>);
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {Object.keys(shownItems[0]).map((val, i) => {
                            return <th key={i} id={val} >{val.toUpperCase()}</th>
                        }
                            
                        )}
                    </tr>
                </thead>
                <tbody>
                    {shownItems.length > 1 || shownItems[0].partnum 
                    ? shownItems.map((item, index) => {
                        return (
                        <tr key={item.partnum}>
                            {Object.values(item).map((val, ind)=>{
                                return (
                                    <td key={ind}>{val}</td>
                                )
                            })}
                        </tr>
                        )}) : <tr key={'nothing'}>
                        <td colSpan={2} style={{'textAlign': 'center'}}>No items match your search. </td>
                    </tr>
                    
                    }
                </tbody>
            </table>
            <div className={styles.div}>
                <button id='previous' onClick={changePage}>&lt;&lt;</button>
                <input type="text" id='partNumber' onChange={filter} placeholder='Enter partnumber' style={{padding:'1em'}} autoComplete='off'/>
                <button id='next' onClick={changePage}>&gt;&gt;</button>
            </div>
        </>
    );
}

function Show({ Head, Foot }) {
    return (
        <>
            <div className="all">
                <Head />
                <br />
                <div className={`middle ${styles.contain}`}>
                    <Items />
                    <p></p>
                </div>
                <Foot />
            </div>
        </>
    )
}

export { Show }
