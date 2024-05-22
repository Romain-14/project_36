function UseCheckAuth() {
    const { user, setUser } = useUser();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAuthentication() {
			const response = await fetch("/api/v1/auth", {
				credentials: "include",
			});
			if (response.status === 401) {
				console.log("Unauthorized");
				return;
			}
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			}
			setIsLoading(false);
		}
		fetchAuthentication();
	}, [setUser]);

  return { isAuth, isLoading };
}

export default UseCheckAuth;