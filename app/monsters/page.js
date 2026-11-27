import { createClient } from "@/lib/supabase/server";

export default async function MonstersPage() {
    const supabase = await createClient();

    const { data: monsters, error } = await supabase.from("monsters").select("*").order("name");

    if (error) {
        return (
            <div className="p-8 text-red-400">
                <h1 className="text-xl font-bold">Erro ao carregar monstros</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <main className="p-8 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Lista de Monstros</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monsters.map(monster => (
                    <div key={monster.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-amber-400">{monster.name}</h2>
                        <p className="text-sm text-gray-400 capitalize mb-2">Tipo: {monster.type}</p>
                        <p className="text-sm text-gray-300 mb-4">{monster.description}</p>

                        <div className="grid grid-cols-4 gap-2 text-center text-xs bg-gray-900 p-2 rounded">
                            <div>
                                <span className="block text-gray-500">HP</span>
                                <span className="font-bold">{monster.hp}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500">Atk</span>
                                <span className="font-bold">{monster.attack}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500">Def</span>
                                <span className="font-bold">{monster.defense}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500">Vel</span>
                                <span className="font-bold">{monster.speed}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
