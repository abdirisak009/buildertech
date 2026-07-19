export type Provider = {
  name: string;
  phone?: string;
  url?: string;
};

export type ResourceCategory = {
  id: string;
  title: string;
  providers: Provider[];
};

export const RESOURCES_INTRO =
  "Un directorio seleccionado de proveedores de servicios dentro de un radio de 30 millas de nuestra oficina en Decatur — que atiende el condado de DeKalb, Atlanta, Marietta y el condado de Cobb. Son las personas a las que nosotros llamamos. No recibimos comisión de ninguna de ellas.";

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "environmental",
    title: "Servicios Ambientales",
    providers: [
      { name: "EL Mina Inc.", phone: "404-973-5450" },
      { name: "EnviroSoil", phone: "678-815-8970", url: "https://www.envirosoilse.com/" },
      { name: "KF Environmental LLC", phone: "678-777-0647" },
    ],
  },
  {
    id: "surveyors",
    title: "Topógrafos",
    providers: [
      { name: "Survey Systems", phone: "404-760-0010" },
      { name: "Delta Surveyors", phone: "678-232-4712", url: "https://deltasurveyorsinc.com/" },
      { name: "Land Express Inc", phone: "404-252-5747", url: "https://www.surveylandexpress.com/" },
      { name: "Dekalb Surveys", phone: "404-373-9003", url: "https://dekalbsurveys.com/" },
    ],
  },
  {
    id: "home-improvement",
    title: "Tiendas de Materiales y Mejoras para el Hogar",
    providers: [
      { name: "The Home Depot" },
      { name: "Lowes" },
      { name: "ACE Hardware" },
    ],
  },
  {
    id: "electrical",
    title: "Electricidad",
    providers: [
      {
        name: "New Beginnings Electrical",
        phone: "404-200-6697",
        url: "https://newbeginningselectrical.com/",
      },
    ],
  },
  {
    id: "home-inspectors",
    title: "Inspectores de Vivienda",
    providers: [
      { name: "Residential Inspector of America", phone: "770-966-6879" },
      { name: "Avalon Home Inspections", phone: "678-821-5527" },
      { name: "The BrickKicker — Georgia", phone: "706-222-9604" },
    ],
  },
  {
    id: "mep-inspectors",
    title: "Inspectores de Instalaciones (MEP)",
    providers: [{ name: "Crimson Home Inspection", phone: "404-200-7743" }],
  },
  {
    id: "hauling",
    title: "Acarreo de Materiales",
    providers: [
      {
        name: "AM Consulting & Hauling",
        phone: "404-862-0305",
        url: "https://www.amconsultingllc.net",
      },
    ],
  },
  {
    id: "plumbing",
    title: "Plomería",
    providers: [
      { name: "TE Certified Plumbers", phone: "404-260-4177" },
      { name: "Reliable MEP", phone: "470-771-5711" },
      { name: "Superior Plumbing", phone: "770-766-2540" },
    ],
  },
  {
    id: "roofing",
    title: "Techos",
    providers: [
      { name: "Accent Roofing Service", phone: "770-698-4585" },
      { name: "Findlay Roofing", phone: "706-222-9331" },
      { name: "ARAC Roof It Forward", phone: "770-858-7569" },
    ],
  },
  {
    id: "garage-doors",
    title: "Puertas de Garaje",
    providers: [
      { name: "Overhead Door Company of Atlanta", phone: "404-751-2527" },
      { name: "Elite Overhead Garage Doors", phone: "770-698-1648" },
      { name: "OGD Overhead Garage Door — Atlanta", phone: "404-260-9024" },
    ],
  },
  {
    id: "tree-services",
    title: "Servicios de Poda y Tala",
    providers: [
      { name: "Northside Tree Professionals", phone: "770-691-9216" },
      { name: "Caldwell Tree Care", phone: "678-329-0223" },
      { name: "United Tree Pro", phone: "770-691-9488" },
    ],
  },
  {
    id: "arborists",
    title: "Arboristas",
    providers: [
      { name: "Top Tier Trees", phone: "678-730-2608" },
      { name: "TreeDog Atlanta Services LLC", phone: "678-800-6848" },
      { name: "Gill Tree Care", phone: "404-937-6800" },
    ],
  },
  {
    id: "lumber",
    title: "Madererías",
    providers: [
      { name: "Peach State Lumber", phone: "770-428-3622" },
      { name: "Carolina Lumber", phone: "404-794-7991" },
      { name: "Builders Surplus", phone: "404-350-1772" },
      { name: "Cofer Bros", phone: "770-938-3200" },
      { name: "Norcross Supply Comp", phone: "770-448-2128" },
      { name: "Truss Components of Atlanta", phone: "706-814-3104" },
    ],
  },
  {
    id: "permit-expeditors",
    title: "Gestores de Permisos",
    providers: [{ name: "Metro Atlanta Permits", phone: "470-737-1276" }],
  },
  {
    id: "framing",
    title: "Estructura y Armado",
    providers: [{ name: "JEM Framing Services LLC", phone: "404-396-4335" }],
  },
];
