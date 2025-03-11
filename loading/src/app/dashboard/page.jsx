"use client";

import React, { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import StatisticsCard from "../../components/StatisticsCard";
// Usamos o SalesChart para ilustrar os gráficos
import SalesChart from "../../components/SalesChart";

export default function DashboardPage() {
  const [data, setData] = useState({
    statisticsCardsData: [],
    // Aqui você pode incluir outras informações se necessário
    // Por exemplo: salesChartData: { categories: [...], seriesData: [...] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) {
          throw new Error("Erro ao buscar dados do dashboard");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        Carregando...
      </div>
    );
  }

  // Atualizado: removemos qualquer menção a clientes e trocamos "Vendas por Preço" por "Vendas Diárias"
  const charts = [
    {
      title: "Vendas por Peça",
      categories: ["Peça A", "Peça B", "Peça C"],
      seriesData: [150, 200, 120],
      footer: "Dados do último mês",
    },
    {
      title: "Melhores Vendas",
      categories: ["Item 1", "Item 2", "Item 3"],
      seriesData: [300, 250, 180],
      footer: "Ranking dos itens mais vendidos",
    },
    {
      title: "Estoque Atual",
      categories: ["Peça A", "Peça B", "Peça C"],
      seriesData: [500, 400, 350],
      footer: "Atualizado diariamente",
    },
    {
      title: "Vendas Sazonais",
      categories: ["Verão", "Outono", "Inverno", "Primavera"],
      seriesData: [100, 150, 200, 130],
      footer: "Análise por estação do ano",
    },
    {
      title: "Previsão de Vendas Futuras",
      categories: ["Mês 1", "Mês 2", "Mês 3", "Mês 4"],
      seriesData: [180, 190, 200, 210],
      footer: "Modelo de Machine Learning",
    },
    {
      // Substituímos "Vendas por Preço" por "Vendas Diárias"
      title: "Vendas Diárias",
      categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      seriesData: [50, 60, 45, 80, 120, 90, 70],
      footer: "Distribuição diária de vendas",
    },
    {
      title: "Comparativo Mensal de Vendas",
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      seriesData: [200, 220, 180, 250, 210],
      footer: "Tendência mensal",
    },
    {
      title: "Relatório Geral de Vendas",
      categories: ["Total"],
      seriesData: [1500],
      footer: "Visão consolidada",
    },
  ];

  return (
    <div className="space-y-8">
      <h2
        className="text-6xl font-bold text-white text-center"
        style={{ WebkitTextStroke: "2px #1f2937" }}
      >
        Visão Geral
      </h2>

      {/* Cards de Estatísticas */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.statisticsCardsData.map((item, index) => (
          <StatisticsCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon && item.icon()}
            footer={
              <p className="text-sm text-gray-600">
                <strong className={item.footer.color}>{item.footer.value}</strong>
                &nbsp;{item.footer.label}
              </p>
            }
          />
        ))}
      </div>

      {/* Gráficos – 8 gráficos focados em estoque e vendas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {charts.map((chart, index) => (
          <SalesChart
            key={index}
            title={chart.title}
            categories={chart.categories}
            seriesData={chart.seriesData}
            footer={
              <p className="flex items-center text-sm text-gray-600">
                <span className="mr-1">
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-gray-400" />
                </span>
                {chart.footer}
              </p>
            }
          />
        ))}
      </div>
    </div>
  );
}
