# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_28_215820) do

  create_table "dividend_trades", force: :cascade do |t|
    t.integer "dividend_id"
    t.integer "trades_id"
    t.index ["dividend_id"], name: "index_dividend_trades_on_dividend_id"
    t.index ["trades_id"], name: "index_dividend_trades_on_trades_id"
  end

  create_table "dividends", force: :cascade do |t|
    t.integer "stock_id"
    t.datetime "paid_on"
    t.datetime "exdividend_on"
    t.decimal "amount", precision: 15, scale: 10
    t.decimal "shares", precision: 15, scale: 10
    t.decimal "per_share", precision: 15, scale: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_id"], name: "index_dividends_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.integer "annual_dividends"
    t.boolean "heart"
    t.boolean "star"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "exchange"
    t.string "website"
    t.string "ceo"
    t.string "sector"
    t.string "industry"
    t.integer "employees"
  end

  create_table "trades", force: :cascade do |t|
    t.integer "stock_id"
    t.string "order_type"
    t.datetime "executed_at"
    t.decimal "price", precision: 15, scale: 10
    t.decimal "shares", precision: 15, scale: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_id"], name: "index_trades_on_stock_id"
  end

end
