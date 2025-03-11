// src/app/api/dashboard/route.js
import prisma from "../../../lib/prisma"; // Certifique-se de ter o prisma configurado

export async function GET() {
  try {
    // Aqui, você pode consultar os modelos do banco de dados e preparar os dados.
    // Para fins de exemplo, vamos retornar dados fictícios:
    const statisticsCardsData = [
      {
        title: "Vendas",
        value: "R$ 10.000",
        // Para ícones, você pode salvar o nome do ícone (ou uma chave) e converter depois
        // Aqui, usaremos uma função que retorna um componente (ou simplesmente um elemento JSX)
        icon: () => <i className="fas fa-shopping-cart text-white"></i>,
        footer: { color: "text-green-600", value: "5%", label: "aumento" },
      },
      {
        title: "Clientes",
        value: 150,
        icon: () => <i className="fas fa-users text-white"></i>,
        footer: { color: "text-red-600", value: "2%", label: "redução" },
      },
    ];

    const statisticsChartsData = [
      {
        title: "Gráfico de Vendas",
        description: "Desempenho das vendas no último mês",
        footer: "Atualizado recentemente",
      },
    ];

    const dashboardData = {
      statisticsCardsData,
      statisticsChartsData,
    };

    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar dados do dashboard", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
