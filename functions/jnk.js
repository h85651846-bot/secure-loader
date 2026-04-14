const used = new Set();

export async function onRequest({ request }) {
  const SECRET = "secret123";

  const url = new URL(request.url);
  const ts = url.searchParams.get("ts");
  const sig = url.searchParams.get("sig");
  const token = url.searchParams.get("token");

  if (!token) return new Response("NO");

  const keyStr = ts + sig + token;
  if (used.has(keyStr)) return new Response("USED");

  const ua = request.headers.get("user-agent") || "";
  if (
    ua.includes("curl") ||
    ua.includes("Postman") ||
    ua.includes("python") ||
    ua.includes("wget")
  ) return new Response("BLOCK");

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(ts)
  );

  const expected = [...new Uint8Array(sigBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  if (Date.now() - Number(ts) > 20000) return new Response("EXPIRED");
  if (expected !== sig) return new Response("INVALID");

  used.add(keyStr);

  return new Response(`
print("OK")

local Env = loadstring(game:HttpGet("https://raw.githubusercontent.com/MerrySubs4t/96soul/refs/heads/main/Utilities/NongkhawKawaii-UI.luau", true))()
local LocalPlayer = game:GetService("Players").LocalPlayer

local Banner = {
	['Main'] = 101849161408766,
	['Auto'] = 110162136250435,
	['Setting'] = 72210587662292,
	['Misc'] = 84034775913393,
	['Items'] = 98574803492996,
	['Shop'] = 74630923244478,
	['Teleport'] = 137847566773112,
	['Visual'] = 123257335719276,
	['Jeepspeed'] = 112935442242481,
	['Update'] = 86844430363710,
}

local Window = Env:Window({
	Title = "ZryoX Hub",
	Desc = "Diesel n steel v1.0.4"
})

local MainTab = Window:Add({
	Title = "Main",
	Desc = "main",
	Banner = Banner.Misc
})

local MainSection = MainTab:Section({
	Title = "1",
	Side = 'l'
})

MainSection:Toggle({
    Title = "DUPE COIN",
    Desc = "",
    Icon = 116977402855273,
    Value = false,
    Callback = function(v)
        _G.DupeCoin = v
        
        if _G.DupeCoin then
            task.spawn(function()
                local BurstAmount = 10
                local Player = game:GetService("Players").LocalPlayer
                local ReplicatedStorage = game:GetService("ReplicatedStorage")
                
                local JeepFolder = workspace:WaitForChild("Jeepnies", 9e9)
                local PlayerJeep = JeepFolder:WaitForChild(Player.Name, 9e9)
                local PassengerValues = PlayerJeep:WaitForChild("PassengerValues", 9e9)
                local Remote = ReplicatedStorage:WaitForChild("CatNet", 9e9):WaitForChild("Cat", 9e9)

                local args = {
                    [1] = {
                        [1] = {
                            [1] = "3",
                            [2] = "RecieveCoin",
                            [3] = {
                                ["PassengerValues"] = PassengerValues,
                                ["Password"] = 617816953,
                                ["Main"] = true,
                                ["Value"] = 300,
                            },
                        },
                    },
                }

                while _G.DupeCoin do
                    for i = 1, BurstAmount do
                        Remote:FireServer(unpack(args))
                    end
                    task.wait()
                end
            end)
        end
    end
})

MainSection:Toggle({
    Title = "DUPE CASH",
    Desc = "",
    Icon = 14732298754,
    Value = false,
    Callback = function(v)
        _G.DupeCash = v
        local CoreGui = game:GetService("CoreGui")
        
        if _G.DupeCash then
            local TweenService = game:GetService("TweenService")
            local UserInputService = game:GetService("UserInputService")
            local ReplicatedStorage = game:GetService("ReplicatedStorage")

            if CoreGui:FindFirstChild("NovaHubGUI") then
                CoreGui:FindFirstChild("NovaHubGUI"):Destroy()
            end

            local ScreenGui = Instance.new("ScreenGui")
            ScreenGui.Name = "NovaHubGUI"
            ScreenGui.Parent = CoreGui
            ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

            local MainFrame = Instance.new("Frame")
            MainFrame.Name = "MainFrame"
            MainFrame.Parent = ScreenGui
            MainFrame.BackgroundTransparency = 0
            MainFrame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
            MainFrame.Position = UDim2.new(0.5, -120, 0.5, -65)
            MainFrame.Size = UDim2.new(0, 240, 0, 112)
            MainFrame.BorderSizePixel = 0

            local MainCorner = Instance.new("UICorner")
            MainCorner.CornerRadius = UDim.new(0, 15)
            MainCorner.Parent = MainFrame

            local MainGradient = Instance.new("UIGradient")
            MainGradient.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0.00, Color3.fromRGB(18,18,22)),
                ColorSequenceKeypoint.new(1.00, Color3.fromRGB(6,6,10))
            }
            MainGradient.Rotation = 45
            MainGradient.Parent = MainFrame

            local UIStroke = Instance.new("UIStroke")
            UIStroke.Parent = MainFrame
            UIStroke.Thickness = 2
            UIStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border

            local StrokeGradientMain = Instance.new("UIGradient")
            StrokeGradientMain.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0, Color3.fromRGB(80,80,80)),
                ColorSequenceKeypoint.new(0.5, Color3.fromRGB(200,200,200)),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(80,80,80))
            }
            StrokeGradientMain.Parent = UIStroke

            task.spawn(function()
                while StrokeGradientMain and StrokeGradientMain.Parent do
                    StrokeGradientMain.Rotation += 1.5
                    task.wait(0.01)
                end
            end)

            local Title = Instance.new("TextLabel")
            Title.Name = "Title"
            Title.Parent = MainFrame
            Title.BackgroundTransparency = 1
            Title.Position = UDim2.new(0, 0, 0.05, 0)
            Title.Size = UDim2.new(1, 0, 0.35, 0)
            Title.Font = Enum.Font.FredokaOne
            Title.Text = "ZryoX Hub Dupe Cash"
            Title.TextColor3 = Color3.fromRGB(255,255,255)
            Title.TextSize = 20
            Title.ZIndex = 5

            local TitleStroke = Instance.new("UIStroke")
            TitleStroke.Parent = Title
            TitleStroke.Thickness = 2
            TitleStroke.Color = Color3.fromRGB(0, 0, 0)

            local TitleGradient = Instance.new("UIGradient")
            TitleGradient.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0.00, Color3.fromRGB(160,160,160)),
                ColorSequenceKeypoint.new(0.50, Color3.fromRGB(230,230,230)),
                ColorSequenceKeypoint.new(1.00, Color3.fromRGB(160,160,160))
            }
            TitleGradient.Transparency = NumberSequence.new{
                NumberSequenceKeypoint.new(0,0),
                NumberSequenceKeypoint.new(0.45,0),
                NumberSequenceKeypoint.new(0.5,0.4),
                NumberSequenceKeypoint.new(0.55,0),
                NumberSequenceKeypoint.new(1,0)
            }
            TitleGradient.Parent = Title

            task.spawn(function()
                local offset = -1
                while Title and Title.Parent do
                    TitleGradient.Offset = Vector2.new(offset,0)
                    offset += 0.025
                    if offset > 1 then
                        offset = -1
                    end
                    task.wait(0.02)
                end
            end)

            local ToggleButton = Instance.new("TextButton")
            ToggleButton.Name = "ToggleButton"
            ToggleButton.Parent = MainFrame
            ToggleButton.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
            ToggleButton.Position = UDim2.new(0.075, 0, 0.45, 0)
            ToggleButton.Size = UDim2.new(0.85, 0, 0.45, 0)
            ToggleButton.AutoButtonColor = false
            ToggleButton.Text = ""

            local ButtonCorner = Instance.new("UICorner")
            ButtonCorner.CornerRadius = UDim.new(0, 12)
            ButtonCorner.Parent = ToggleButton

            local ButtonMainGradient = Instance.new("UIGradient")
            ButtonMainGradient.Name = "ButtonMainGradient"
            ButtonMainGradient.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0.00, Color3.fromRGB(20,20,25)),
                ColorSequenceKeypoint.new(1.00, Color3.fromRGB(8,8,12))
            }
            ButtonMainGradient.Rotation = 90
            ButtonMainGradient.Parent = ToggleButton

            local ButtonShine = Instance.new("UIGradient")
            ButtonShine.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0, Color3.fromRGB(255,255,255)),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(255,255,255))
            }
            ButtonShine.Transparency = NumberSequence.new{
                NumberSequenceKeypoint.new(0,1),
                NumberSequenceKeypoint.new(0.4,1),
                NumberSequenceKeypoint.new(0.5,0.5),
                NumberSequenceKeypoint.new(0.6,1),
                NumberSequenceKeypoint.new(1,1)
            }
            ButtonShine.Parent = ToggleButton

            task.spawn(function()
                local offset = -1
                while ToggleButton and ToggleButton.Parent do
                    ButtonShine.Offset = Vector2.new(offset,0)
                    offset += 0.04
                    if offset > 1 then
                        offset = -1
                    end
                    task.wait(0.02)
                end
            end)

            local ButtonStroke = Instance.new("UIStroke")
            ButtonStroke.Parent = ToggleButton
            ButtonStroke.Thickness = 2
            ButtonStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border

            local StrokeGradient = Instance.new("UIGradient")
            StrokeGradient.Color = ColorSequence.new{
                ColorSequenceKeypoint.new(0, Color3.fromRGB(120,120,120)),
                ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255,255,255)),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(120,120,120))
            }
            StrokeGradient.Parent = ButtonStroke

            task.spawn(function()
                while StrokeGradient and StrokeGradient.Parent do
                    StrokeGradient.Rotation += 2
                    task.wait(0.01)
                end
            end)

            local ButtonLabel = Instance.new("TextLabel")
            ButtonLabel.Name = "ButtonLabel"
            ButtonLabel.Parent = ToggleButton
            ButtonLabel.BackgroundTransparency = 1
            ButtonLabel.Size = UDim2.new(1, 0, 1, 0)
            ButtonLabel.Font = Enum.Font.FredokaOne
            ButtonLabel.Text = "OFF"
            ButtonLabel.TextColor3 = Color3.fromRGB(200,200,200)
            ButtonLabel.TextSize = 22
            ButtonLabel.ZIndex = 3

            local toggledBtn = false
            local db = false

            ToggleButton.MouseButton1Click:Connect(function()
                if db then return end
                db = true
                toggledBtn = not toggledBtn
                
                if toggledBtn then
                    ButtonLabel.Text = "ON"
                    ButtonLabel.TextColor3 = Color3.fromRGB(255,255,255)
                    ButtonMainGradient.Color = ColorSequence.new{
                        ColorSequenceKeypoint.new(0.00, Color3.fromRGB(0,120,0)),
                        ColorSequenceKeypoint.new(1.00, Color3.fromRGB(0,40,0))
                    }
                    
                    task.spawn(function()
                        local count = 900
                        while toggledBtn and ScreenGui and ScreenGui.Parent do
                            for i = 100, count do
                                pcall(function()
                                    local RecieveCash = ReplicatedStorage:WaitForChild("CatNet", 9e9):WaitForChild("Cat", 9e9)
                                    RecieveCash:FireServer({
                                        [1] = {
                                            [1] = "3",
                                            [2] = "RecieveCash",
                                            [3] = {
                                                ["Value"] = 100,
                                                ["Main"] = true,
                                                ["Password"] = 66357509
                                            }
                                        }
                                    })
                                end)
                            end
                            task.wait(0.025)
                        end
                    end)
                else
                    ButtonLabel.Text = "OFF"
                    ButtonLabel.TextColor3 = Color3.fromRGB(200,200,200)
                    ButtonMainGradient.Color = ColorSequence.new{
                        ColorSequenceKeypoint.new(0.00, Color3.fromRGB(20,20,25)),
                        ColorSequenceKeypoint.new(1.00, Color3.fromRGB(8,8,12))
                    }
                end
                task.wait(0.2)
                db = false
            end)

            local dragging, dragInput, dragStart, startPos
            local function update(input)
                local delta = input.Position - dragStart
                local targetPos = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
                TweenService:Create(MainFrame, TweenInfo.new(0.1), {Position = targetPos}):Play()
            end

            MainFrame.InputBegan:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
                    dragging = true
                    dragStart = input.Position
                    startPos = MainFrame.Position
                    input.Changed:Connect(function()
                        if input.UserInputState == Enum.UserInputState.End then dragging = false end
                    end)
                end
            end)

            MainFrame.InputChanged:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
                    dragInput = input
                end
            end)

            UserInputService.InputChanged:Connect(function(input)
                if input == dragInput and dragging then update(input) end
            end)
            
        else
            if CoreGui:FindFirstChild("NovaHubGUI") then
                CoreGui:FindFirstChild("NovaHubGUI"):Destroy()
            end
        end
    end,
})

local MainSection2 = MainTab:Section({
	Title = "2",
	Side = 'r'
})

local isKmActive = false
local kmSpeed = 550

MainSection2:Slider({
    Title = "AUTO KM SPEED",
    Min = 1000,
    Max = 5000,
    Value = 550,
    Rounding = 100,
    CallBack = function(v)
        kmSpeed = v
    end
})

MainSection2:Toggle({
    Title = "ENABLE AUTO KM",
    Desc = "",
    Value = false,
    Callback = function(v)
        isKmActive = v
        if isKmActive then
            task.spawn(function()
                local flightHeight = 500
                while isKmActive do
                    local char = LocalPlayer.Character
                    local hum = char and char:FindFirstChild("Humanoid")
                    if hum and hum.SeatPart then
                        local car = hum.SeatPart.Parent
                        if car:FindFirstChild("Body") and car.Body:FindFirstChild("#Weight") then
                            car.PrimaryPart = car.Body["#Weight"]
                        end
                        local carPrimaryPart = car.PrimaryPart or (car:FindFirstChild("Body") and car.Body:FindFirstChild("#Weight"))
                        if carPrimaryPart then
                            local location1 = Vector3.new(-693389205.29999983, flightHeight, 8299919.8599935)
                            local location2 = Vector3.new(-838347594.54999910, flightHeight, 5999130.9999526)
                            
                            repeat
                                task.wait()
                                if not (hum.SeatPart) or not isKmActive then break end
                                carPrimaryPart.AssemblyLinearVelocity = (location1 - carPrimaryPart.Position).Unit * kmSpeed
                                car:PivotTo(CFrame.lookAt(carPrimaryPart.Position, location1))
                            until (carPrimaryPart.Position - location1).Magnitude < 50
                            
                            carPrimaryPart.AssemblyLinearVelocity = Vector3.zero
                            
                            repeat
                                task.wait()
                                if not (hum.SeatPart) or not isKmActive then break end
                                carPrimaryPart.AssemblyLinearVelocity = (location2 - carPrimaryPart.Position).Unit * kmSpeed
                                car:PivotTo(CFrame.lookAt(carPrimaryPart.Position, location2))
                            until (carPrimaryPart.Position - location2).Magnitude < 50
                            
                            carPrimaryPart.AssemblyLinearVelocity = Vector3.zero
                        end
                    end
                    task.wait(1)
                end
            end)
        end
    end
})

MainSection2:Toggle({
	Title = "AUTO SUKLI",
	Desc = "",
	Value = false,
	Callback = function(v)
		_G.AutoSukli = v
	end,
})

local MainSection3 = MainTab:Section({
	Title = "3",
	Side = 'r'
})

local toggled = false
local spamAmount = 2570 

local mt = getrawmetatable(game)
local old = mt.__namecall
setreadonly(mt, false)

mt.__namecall = function(remote, ...)
    local method = getnamecallmethod()
    local args = {...}
    
    if toggled and (method == "FireServer" or method == "InvokeServer") then
        if remote.Name == "UnloadPassenger" then
            for i = 1, spamAmount do 
                old(remote, unpack(args))
            end
        end
    end
    
    return old(remote, ...)
end

setreadonly(mt, true)

MainSection3:Toggle({
    Title = "EXP BOOST",
    Desc = "Teleport, then fill up your passengers, then teleport to the drop off.",
    Value = false,
    Callback = function(v)
        toggled = v
    end,
})

MainSection3:Slider({
    Title = "EXP BOOST AMOUNT",
    Min = 100,
    Max = 5000,
    Value = 2570,
    Rounding = 0,
    CallBack = function(v)
        spamAmount = v
    end,
})

local LocalPlayer = game:GetService("Players").LocalPlayer

local function teleportEntity(target)
    local char = LocalPlayer.Character
    if not char or not target then return end
    local hrp = char:FindFirstChild("HumanoidRootPart")
    local hum = char:FindFirstChildOfClass("Humanoid")
    if not hrp or not hum then return end

    local targetCF = target.CFrame * CFrame.new(0, 5, 0)

    if hum.Sit and hum.SeatPart and hum.SeatPart:IsA("VehicleSeat") then
        local model = hum.SeatPart:FindFirstAncestorOfClass("Model")
        if model and model.PrimaryPart then
            for _, part in ipairs(model:GetDescendants()) do
                if part:IsA("BasePart") then part.Anchored = true end
            end
            model:SetPrimaryPartCFrame(targetCF)
            task.wait()
            for _, part in ipairs(model:GetDescendants()) do
                if part:IsA("BasePart") then part.Anchored = false end
            end
            return
        end
    end
    hrp.CFrame = targetCF
end

local MainSection4 = MainTab:Section({
    Title = "4",
    Side = 'o'
})

MainSection4:Button({
    Title = "Teleport to Bulakan",
    Callback = function()
        local target = workspace.Map.Misc.TerminalParts["Balagtas - Bulakan"].ToBalagtasTerminalLoadPoint
        teleportEntity(target)
    end
})

MainSection4:Button({
    Title = "Teleport to Balagtas Drop",
    Callback = function()
        local target = workspace.Map.Misc.PassengerSpawnPoints["Balagtas - Bulakan"].BalagtasTerminalDropPoint
        teleportEntity(target)
    end
})

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local LocalPlayer = Players.LocalPlayer

local velocityEnabled = false
local velocityMult = 0.01572
local maxSpeed = 140
local customSpeedValue = 0.01572
local customMaxSpeed = 140
local currentSeat = nil
local gasHeld = false
local brakeHeld = false
local wHeld = false
local gasButton = nil
local brakeButton = nil

local JeepSpeedTab = Window:Add({
    Title = "Jeepspeed",
    Desc = "Jeep",
    Banner = Banner.Main
})

local JeepspeedSection1 = JeepSpeedTab:Section({
    Title = "Speed Settings",
    Side = 'l'
})

JeepspeedSection1:Textbox({
    Title = "TYPE SPEED",
    PlaceHolder = "Enter speed value",
    ClearOnFocus = false,
    Callback = function(value)
        local num = tonumber(value)
        if num then
            customSpeedValue = num
            velocityMult = num
        end
    end
})

JeepspeedSection1:Textbox({
    Title = "MAX SPEED",
    PlaceHolder = "Enter maximum speed limit",
    ClearOnFocus = false,
    Callback = function(value)
        local num = tonumber(value)
        if num then
            customMaxSpeed = num
            maxSpeed = num
        end
    end
})

JeepspeedSection1:Button({
    Title = "APPLY SPEED SETTINGS",
    Callback = function()
        velocityMult = customSpeedValue
        maxSpeed = customMaxSpeed
        print("Speed settings applied - Type Speed: " .. velocityMult .. ", Max Speed: " .. maxSpeed)
    end
})

JeepspeedSection1:Toggle({
    Title = "JEEP SPEED",
    Desc = "Boost your jeep speed when holding Gas or W",
    Value = false,
    Callback = function(state)
        velocityEnabled = state
    end
})

local function setupSeat()
    local character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()
    local humanoid = character:WaitForChild("Humanoid")
    humanoid:GetPropertyChangedSignal("SeatPart"):Connect(function()
        local seat = humanoid.SeatPart
        if seat and seat:IsA("BasePart") then
            currentSeat = seat
        else
            currentSeat = nil
        end
    end)
    local seat = humanoid.SeatPart
    if seat and seat:IsA("BasePart") then
        currentSeat = seat
    end
end

setupSeat()
LocalPlayer.CharacterAdded:Connect(setupSeat)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.W then
        wHeld = true
    end
end)

UserInputService.InputEnded:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.W then
        wHeld = false
    end
end)

task.spawn(function()
    repeat task.wait(0.5) until LocalPlayer:FindFirstChild("PlayerGui")
    local pGui = LocalPlayer.PlayerGui
    local success, buttonsFolder = pcall(function()
        return pGui:WaitForChild("A-Chassis Interface"):WaitForChild("Buttons")
    end)
    if success and buttonsFolder then
        gasButton = buttonsFolder:FindFirstChild("Gas")
        brakeButton = buttonsFolder:FindFirstChild("Brake")
        if gasButton then
            gasButton.MouseButton1Down:Connect(function() gasHeld = true end)
            gasButton.MouseButton1Up:Connect(function() gasHeld = false end)
            gasButton.TouchStarted:Connect(function() gasHeld = true end)
            gasButton.TouchEnded:Connect(function() gasHeld = false end)
        end
        if brakeButton then
            brakeButton.MouseButton1Down:Connect(function() brakeHeld = true end)
            brakeButton.MouseButton1Up:Connect(function() brakeHeld = false end)
            brakeButton.TouchStarted:Connect(function() brakeHeld = true end)
            brakeButton.TouchEnded:Connect(function() brakeHeld = false end)
        end
    end
end)

RunService.Heartbeat:Connect(function(dt)
    if not velocityEnabled or not currentSeat then return end
    local vel = currentSeat.AssemblyLinearVelocity
    local speed = vel.Magnitude
    if (gasHeld or wHeld) and not brakeHeld and speed < maxSpeed then
        local mult = 1 + (velocityMult * (dt * 60))
        currentSeat.AssemblyLinearVelocity = Vector3.new(vel.X * mult, vel.Y, vel.Z * mult)
    end
end)

local function teleportEntity(target)
    local char = LocalPlayer.Character
    if not char or not target then return end
    local hrp = char:FindFirstChild("HumanoidRootPart")
    local hum = char:FindFirstChildOfClass("Humanoid")
    if not hrp or not hum then return end

    local targetCF = target.CFrame * CFrame.new(0, 5, 0)

    if hum.Sit and hum.SeatPart and hum.SeatPart:IsA("VehicleSeat") then
        local model = hum.SeatPart:FindFirstAncestorOfClass("Model")
        if model and model.PrimaryPart then
            for _, part in ipairs(model:GetDescendants()) do
                if part:IsA("BasePart") then part.Anchored = true end
            end
            model:SetPrimaryPartCFrame(targetCF)
            task.wait()
            for _, part in ipairs(model:GetDescendants()) do
                if part:IsA("BasePart") then part.Anchored = false end
            end
            return
        end
    end
    hrp.CFrame = targetCF
end

pcall(function()
    local CoreGui = game:GetService("CoreGui")
    local Players = game:GetService("Players")
    local LocalPlayer = Players.LocalPlayer
    
    local spyKeywords = {
        "block remote", "copy code", "get result",
        "ignore remote", "unblock all remotes", "remote spy",
        "simplespy", "turtlespy", "hydrocal", "upvalue",
        "constant", "call remote", "fire remote"
    }

    local whitelist = {
        ["RobloxGui"] = true,
        ["RobloxPromptGui"] = true,
        ["RobloxNetworkUI"] = true,
        ["DevConsoleMaster"] = true,
        ["TeleportUI"] = true,
        ["PlayerList"] = true,
        ["Chat"] = true,
        ["BubbleChat"] = true,
        ["ThemeProvider"] = true,
        ["DefaultToolBar"] = true,
        ["TopBarGui"] = true,
        ["PurchasePrompt"] = true
    }

    local function Punish(obj)
        pcall(function() obj:Destroy() end)
        pcall(function() LocalPlayer:Kick("banning katuloy") end)
        
        while true do
            string.rep("Crash", 9999999)
        end
    end

    local function ScanUI(obj)
        if whitelist[obj.Name] then return end

        local detected = false
        
        for _, v in pairs(obj:GetDescendants()) do
            local nameStr = string.lower(v.Name)
            local textStr = ""

            if v:IsA("TextButton") or v:IsA("TextLabel") or v:IsA("TextBox") then
                textStr = string.lower(v.Text)
            end

            for _, keyword in pairs(spyKeywords) do
                if string.find(nameStr, keyword) or (textStr ~= "" and string.find(textStr, keyword)) then
                    detected = true
                    break
                end
            end
            if detected then break end
        end
        
        if detected then
            task.spawn(function() Punish(obj) end)
        end
    end

    for _, child in pairs(CoreGui:GetChildren()) do
        task.spawn(function() ScanUI(child) end)
    end

    CoreGui.ChildAdded:Connect(function(child)
        task.wait(0.1)
        task.spawn(function() ScanUI(child) end)
    end)

    task.spawn(function()
        while task.wait(5) do
            for _, child in pairs(CoreGui:GetChildren()) do
                ScanUI(child)
            end
        end
    end)
end)
`, {
    headers: { "content-type": "text/plain" },
  });
    }
